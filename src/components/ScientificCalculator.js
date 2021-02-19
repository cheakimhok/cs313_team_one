import React, { Component } from 'react';
import './ScientificCalculator.css';
import PointTarget from 'react-point';

class AutoScalingText extends Component {
    state = {
        scale: 1,
    };

    componentDidUpdate() {
        const { scale } = this.state;
        const node = this.node;
        const parentNode = node.parentNode;
        const availableWidth = parentNode.offsetWidth;
        const actualWidth = node.offsetWidth;
        const actualScale = availableWidth / actualWidth;

        if (scale === actualScale) return;
        if (actualScale < 1) {
            this.setState({ scale: actualScale });
        } else if (scale < 1) {
            this.setState({ scale: 1 });
        }
    }

    render() {
        const { scale } = this.state;

        return (
            <div
                className='auto-scaling-text'
                style={{ transform: `scale(${scale},${scale})` }}
                ref={(node) => (this.node = node)}
            >
                {this.props.children}
            </div>
        );
    }
}

class CalculatorDisplay extends Component {
    render() {
        const { value, ...props } = this.props;

        const language = navigator.language || 'en-US';
        let formattedValue = parseFloat(value).toLocaleString(language, {
            useGrouping: true,
            maximumFractionDigits: 6,
        });

        const match = value.match(/\.\d*?(0*)$/);

        if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

        return (
            <div {...props} className='calculator-display'>
                <AutoScalingText>{formattedValue}</AutoScalingText>
            </div>
        );
    }
}

class CalculatorKey extends Component {
    render() {
        const { onPress, className, ...props } = this.props;

        return (
            <PointTarget onPoint={onPress}>
                <button className={`calculator-key ${className}`} {...props} />
            </PointTarget>
        );
    }
}

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (nextValue) => nextValue,
};

class ScientificCalculator extends Component {
    state = {
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false,
        shift: false,
        degree: false,
        memory: {
            memory_plus: 0,
            memory_minus: 0,
            memory_recall: null,
        },
    };

    degreeClick = () => {
        this.setState((state) => {
            return {
                degree: !state.degree,
            }
        });
    }
    
    shiftClick = () => {
        this.setState((state) => {
            return {
                shift: !state.shift,
            };
        });
    };

    clearAll() {
        this.setState({
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false,
        });
    }

    clearDisplay() {
        this.setState({
            displayValue: '0',
        });
    }

    clearLastChar() {
        const { displayValue } = this.state;

        this.setState({
            displayValue: displayValue.substring(0, displayValue.length - 1) || '0',
        });
    }

    toggleSign() {
        const { displayValue } = this.state;
        const newValue = parseFloat(displayValue) * -1;

        this.setState({
            displayValue: String(newValue),
        });
    }

    inputPercent() {
        const { displayValue } = this.state;
        const currentValue = parseFloat(displayValue);

        if (currentValue === 0) return;

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
        const newValue = parseFloat(displayValue) / 100;

        this.setState({
            displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
        });
    }

    inputDot() {
        const { displayValue, waitingForOperand } = this.state;

        if (waitingForOperand === true) {
            this.setState({ displayValue: '0.', waitingForOperand: false });
        } else if (!/\./.test(displayValue)) {
            this.setState({
                displayValue: displayValue + '.',
                waitingForOperand: false,
            });
        }
    }

    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state;

        if (waitingForOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false,
            });
        } else {
            const hasDot = displayValue.includes('.');
            const integer = displayValue.split('.')[0];

            if (!hasDot && integer.length >= 12) {
                return;
            }
            this.setState({
                displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
            });
        }
    }

    performOperation(nextOperator) {
        const { value, displayValue, operator } = this.state;
        const inputValue = parseFloat(displayValue);

        if (value == null) {
            this.setState({
                value: inputValue,
            });
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](currentValue, inputValue);

            this.setState({
                value: newValue,
                displayValue: String(newValue),
            });
        }

        this.setState({
            waitingForOperand: true,
            operator: nextOperator,
        });
    }

    keyDown = (event) => {
        let { key } = event;

        if (key === 'Enter') key = '=';

        if (/\d/.test(key)) {
            event.preventDefault();
            this.inputDigit(parseInt(key, 10));
        } else if (key in CalculatorOperations) {
            event.preventDefault();
            this.performOperation(key);
        } else if (key === '.') {
            event.preventDefault();
            this.inputDot();
        } else if (key === '%') {
            event.preventDefault();
            this.inputPercent();
        } else if (key === 'Backspace') {
            event.preventDefault();
            this.clearLastChar();
        } else if (key === 'Clear') {
            event.preventDefault();

            if (this.state.displayValue !== '0') {
                this.clearDisplay();
            } else {
                this.clearAll();
            }
        }
    };

    memoryClear() {
        this.setState((prevState) => ({
            memory: {
                ...prevState.memory,
                memory_plus: 0,
                memory_minus: 0,
                memory_recall: null,
            },
        }));
    }

    memoryPlus() {
        let temp = parseFloat(this.state.displayValue) + this.state.memory.memory_plus;
        this.setState((prevState) => ({
            memory: {
                ...prevState.memory,
                memory_plus: temp,
            },
        }));
        console.log(this.state.memory.memory_plus);
    }

    memoryMinus() {
        let temp = parseInt(this.state.displayValue) + this.state.memory.memory_minus;
        this.setState((prevState) => ({
            memory: {
                ...prevState.memory,
                memory_minus: temp,
            },
        }));
    }

    memoryRecall() {
        let temp = (this.state.memory.memory_plus - this.state.memory.memory_minus).toString();
        this.setState({
            displayValue: temp,
        });
    }

    power2() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(parseFloat(displayValue), 2)) });
    }

    power3() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(parseFloat(displayValue), 3)) });
    }

    tenPowerX() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(10, parseFloat(displayValue))) });
    }
    
    twoPowerX() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(2, parseFloat(displayValue))) });
    }

    pi() {
        this.setState({ displayValue: String(Math.PI) });
    }

    exponent() {
        this.setState({ displayValue: String(Math.exp(1)) });
    }

    rand() {
        this.setState({ displayValue: String(Math.random()) });
    }

    sin() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.sin(displayValue)) });
        } else {
            const result = String(Math.sin((parseFloat(displayValue) * Math.PI) / 180));
            this.setState({ displayValue: result });
        }
    }

    cos() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.cos(displayValue)) });
        } else {
            const result = String(Math.cos((parseInt(displayValue) * Math.PI) / 180));
            this.setState({ displayValue: result });
        }
    }

    tan() {
        const { displayValue, degree } = this.state;
        if (degree === false) {
            this.setState({ displayValue: String(Math.tan(displayValue)) });
        } else {
            if (displayValue === '90' || displayValue === '270') {
                this.setState({ displayValue: 'Not a number' });
            } else {
                const result = String(Math.tan((parseFloat(displayValue) * Math.PI) / 180));
                this.setState({ displayValue: result });
            }
        }
    }

    sinh() {
        const { displayValue } = this.state;
        const result = String(Math.sinh(parseFloat(displayValue)));
        this.setState({ displayValue: result });
    }

    cosh() {
        const { displayValue } = this.state;
        const result = String(Math.cosh(parseFloat(displayValue)));
        this.setState({ displayValue: result });
    }

    tanh() {
        const { displayValue } = this.state;
        const result = String(Math.tanh(parseFloat(displayValue)));
        this.setState({ displayValue: result });
    }

    sinInverse() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.asin(displayValue)) });
        } else {
            const result = String((Math.asin(parseFloat(displayValue)) * 180) / Math.PI);
            this.setState({ displayValue: result });
        }
    }

    cosInverse() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.acos(displayValue)) });
        } else {
            const result = String((Math.acos(parseFloat(displayValue)) * 180) / Math.PI);
            this.setState({ displayValue: result });
        }
    }

    tanInverse() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.atan(displayValue)) });
        } else {
            const result = String((Math.atan(parseFloat(displayValue)) * 180) / Math.PI);
            this.setState({ displayValue: result });
        }
    }

    sinhInverse() {
        const { displayValue } = this.state;
        const result = String(Math.asinh(parseFloat(displayValue)));
        this.setState({ displayValue: result });
    }

    coshInverse() {
        const { displayValue } = this.state;
        const result = String(Math.acosh(parseFloat(displayValue)));
        this.setState({ displayValue: result });
    }

    tanhInverse() {
        const { displayValue } = this.state;
        const result = String(Math.atanh(parseFloat(displayValue)));
        this.setState({ displayValue: result });
    }

    squareRoot() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.sqrt(parseFloat(displayValue))) });
    }

    cubeRoot() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.cbrt(parseFloat(displayValue))) });
    }

    factorial() {
        const { displayValue } = this.state;
        if (displayValue === '1' || displayValue === '-1') {
            return this.setState({ displayValue });
        } else if (parseInt(displayValue) > 1) {
            var result = 1;
            for (var i = 1; i <= parseInt(displayValue); ++i) {
                result *= i;
            }
            return this.setState({ displayValue: String(result) });
        } else if (parseInt(displayValue) < -1) {
            var resultNegative = 1;
            for (var j = -1; j >= parseInt(displayValue); j--) {
                resultNegative *= j;
            }
            return this.setState({ displayValue: String(resultNegative) });
        }
    }

    log10() {
        const { displayValue } = this.state;
        if (parseInt(displayValue) <= 0) {
            return this.setState({ displayValue: 'Not a Number' });
        }
        this.setState({ displayValue: String(Math.log10(parseInt(displayValue))) });
    }

    log2() {
        const { displayValue } = this.state;
        if (parseInt(displayValue) <= 0) {
            return this.setState({ displayValue: 'Not a Number' });
        }
        this.setState({ displayValue: String(Math.log2(parseInt(displayValue))) });
    }

    log() {
        const { displayValue } = this.state;
        if (parseInt(displayValue) <= 0) {
            return this.setState({ displayValue: 'Not a Number' });
        }
        this.setState({ displayValue: String(Math.log(parseInt(displayValue))) });
    }

    multiplicativeInverse(){
        const { displayValue } = this.state;
        if (displayValue === '0') {
            this.setState({ displayValue: 'Not a number' });
        }
        const result = String(1/displayValue);
        this.setState({ displayValue: result});
    }

    exponential(){
        const { displayValue } = this.state;
        if (displayValue === '0') return this.setState({displayValue: '1'});
        const result = String(Math.exp(parseFloat(displayValue)));
        this.setState({ displayValue: result});
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }

    render() {
        const { displayValue } = this.state;
        const clearDisplay = displayValue !== '0';
        const clearText = clearDisplay ? 'C' : 'AC';

        return (
            <div>
                {' '}
                <div className='calculator-body'>
                    <div class='resultContainer'>
                        <div class='result'>
                            <p>
                                {' '}
                                <CalculatorDisplay value={displayValue} />{' '}
                            </p>
                        </div>
                    </div>
                    <div className='button'>
                        <div className='test'>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                            >
                                (
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                            >
                                )
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryClear()}
                            >
                                mc
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryPlus()}
                            >
                                m+
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryMinus()}
                            >
                                m-
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryRecall()}
                            >
                                mr
                            </CalculatorKey>
                            <CalculatorKey
                                className='clear'
                                style={{ backgroundColor: '#BB4444', color: '#F0F5F9' }}
                                onPress={() =>
                                    clearDisplay ? this.clearDisplay() : this.clearAll()
                                }
                            >
                                {clearText}
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.toggleSign()}
                            >
                                -/+
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputPercent()}
                            >
                                %
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b'}}
                                onPress={() => this.performOperation('/')}
                            >
                                ÷
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={this.shiftClick}>
                                    2
                                    <sup>
                                        <small>nd</small>
                                    </sup>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={this.shiftClick}>
                                    1
                                    <sup>
                                        <small>st</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.power2()}
                            > x
                                <sup>
                                    <small>
                                        2
                                    </small>
                                </sup>
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.power3()}
                            > x
                                <sup>
                                    <small>
                                        3
                                    </small>
                                </sup>
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.power2()}
                            > x
                                <sup>
                                    <small>
                                        y
                                    </small>
                                </sup>
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.exponential()}
                                > e
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                > y
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tenPowerX()}
                                > 10
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.twoPowerX()}
                                > 2
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(7)}
                            >
                                7
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(8)}
                            >
                                8
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(9)}
                            >
                                9
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b'}}
                                onPress={() => this.performOperation('*')}
                            >
                                ×
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b'}}
                                onPress={() => this.multiplicativeInverse()}
                            >
                                1/x
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.squareRoot()}
                            >
                                <sup>
                                    <small>
                                        2
                                    </small>
                                </sup>
                                √
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.cubeRoot()}
                            >
                                <sup>
                                    <small>
                                        3
                                    </small>
                                </sup>
                                √
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                            >
                                <sup>
                                    <small>
                                        y
                                    </small>
                                </sup>
                                √
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.log()}
                                > ln
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                > log
                                    <sub>
                                        <small>y</small>
                                    </sub>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.log10()}
                                > log
                                    <sub>
                                        <small>10</small>
                                    </sub>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.log2()}
                                > log
                                    <sub>
                                        <small>2</small>
                                    </sub>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(4)}
                            >
                                4
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(5)}
                            >
                                5
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(6)}
                            >
                                6
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b'}}
                                onPress={() => this.performOperation('-')}
                            >
                                −
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.factorial()}
                            >
                                x!
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sin()}
                                > sin
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sinInverse()}
                                > sin
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.cos()}
                                > cos
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.cosInverse()}
                                > cos
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tan()}
                                > tan
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tanhInverse()}
                                > tan
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.exponent()}
                            >
                                e
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(4)}
                            >
                                EE
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(1)}
                            >
                                1
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(2)}
                            >
                                2
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(3)}
                            >
                                3
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b'}}
                                onPress={() => this.performOperation('+')}
                            >
                                +
                            </CalculatorKey>
                            {!this.state.degree ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b'}}
                                    onPress={this.degreeClick}>
                                    Rad
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b'}}
                                    onPress={this.degreeClick}>
                                    Deg
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sinh()}
                                > sinh
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sinhInverse()}
                                > sinh
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.cosh()}
                                > cosh
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.coshInverse()}
                                > cosh
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tanh()}
                                > tanh
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey 
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tanhInverse()}
                                > tanh
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.pi()}
                            >
                                π
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.rand()}
                            >
                                Rand
                            </CalculatorKey>
                            <CalculatorKey
                                className='zero'
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(0)}
                            >
                                0
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDot()}
                            >
                                .
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#F0F5F9', color: '#52616b' }}
                                onPress={() => this.performOperation('=')}
                            >
                                =
                            </CalculatorKey>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScientificCalculator;
