import './UnitConverter.css';
import React, { useState, useEffect } from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';

const cn = (...args) => args.filter(Boolean).join(' ');

const Tab = ({ children }) => {
    const { isActive, onClick } = useTabState();

    return (
        <button className={cn('tab', isActive && 'active')} onClick={onClick}>
            {children}
        </button>
    );
};

const UnitConverter = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(1);
    }, []);

    return (
        <Tabs state={[index, setIndex]}>
            <div className='tab-list'>
                <Tab>Length</Tab>
                <Tab>Weight</Tab>
                <Tab>Volume</Tab>
                <Tab>Area</Tab>
                <Tab>Data</Tab>
                <Tab>Time</Tab>
                <Tab>Temperature</Tab>
            </div>
            <div className='tabs'>
                {/* Length */}
                <Panel>
                    <div className='panel-container'>
                        <p className='panel-style'>FROM:</p>
                        <p className='panel-style'>TO:</p>
                    </div>
                    <form>
                        <div className='input-container'>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                        </div>
                    </form>
                    <form id='unit-converter'>
                        <div className='list-container'>
                            <select className='list-style' multiple>
                                <option selected>Meter</option>
                                <option value='1'>Kilometer</option>
                                <option value='2'>Centimeter</option>
                                <option value='3'>Millimeter</option>
                                <option value='4'>Micrometer</option>
                                <option value='5'>Nanometer</option>
                                <option value='6'>Mile</option>
                                <option value='7'>Yard</option>
                                <option value='8'>Inch</option>
                            </select>
                            <select className='list-style' multiple>
                                <option value='1'>Meter</option>
                                <option selected>Kilometer</option>
                                <option value='2'>Centimeter</option>
                                <option value='3'>Millimeter</option>
                                <option value='4'>Micrometer</option>
                                <option value='5'>Nanometer</option>
                                <option value='6'>Mile</option>
                                <option value='7'>Yard</option>
                                <option value='8'>Inch</option>
                            </select>
                        </div>
                    </form>
                </Panel>

                {/* Weight */}
                <Panel>
                    <div className='panel-container'>
                        <p className='panel-style'>FROM:</p>
                        <p className='panel-style'>TO:</p>
                    </div>
                    <form>
                        <div className='input-container'>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                        </div>
                    </form>
                    <form id='unit-converter'>
                        <div className='list-container'>
                            <select className='list-style' multiple>
                                <option selected>Gram</option>
                                <option value='1'>Kilogram</option>
                                <option value='2'>Miligram</option>
                                <option value='3'>Pound</option>
                                <option value='4'>Metric Ton</option>
                                <option value='5'>Long Ton</option>
                                <option value='6'>Short Ton</option>
                                <option value='7'>Ounce</option>
                            </select>
                            <select className='list-style' multiple>
                                <option value='1'>Gram</option>
                                <option selected>Kilogram</option>
                                <option value='2'>Miligram</option>
                                <option value='3'>Pound</option>
                                <option value='4'>Metric Ton</option>
                                <option value='5'>Long Ton</option>
                                <option value='6'>Short Ton</option>
                                <option value='7'>Ounce</option>
                            </select>
                        </div>
                    </form>
                </Panel>

                {/* Volume */}
                <Panel>
                    <div className='panel-container'>
                        <p className='panel-style'>FROM:</p>
                        <p className='panel-style'>TO:</p>
                    </div>
                    <form>
                        <div className='input-container'>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                        </div>
                    </form>
                    <form id='unit-converter'>
                        <div className='list-container'>
                            <select className='list-style' multiple>
                                <option selected>Militer</option>
                                <option value='1'>Liter</option>
                                <option value='2'>Cubic Meter</option>
                                <option value='3'>Cubic Kilometer</option>
                                <option value='4'>Cubic Centimeter</option>
                                <option value='5'>Cubic Milimeter</option>
                                <option value='6'>US Gallon</option>
                                <option value='7'>US Quart</option>
                                <option value='8'>US Cup</option>
                            </select>
                            <select className='list-style' multiple>
                                <option value='1'>Militer</option>
                                <option selected>Liter</option>
                                <option value='2'>Cubic Meter</option>
                                <option value='3'>Cubic Kilometer</option>
                                <option value='4'>Cubic Centimeter</option>
                                <option value='5'>Cubic Milimeter</option>
                                <option value='6'>US Gallon</option>
                                <option value='7'>US Quart</option>
                                <option value='8'>US Cup</option>
                            </select>
                        </div>
                    </form>
                </Panel>

                {/* Area */}
                <Panel>
                    <div className='panel-container'>
                        <p className='panel-style'>FROM:</p>
                        <p className='panel-style'>TO:</p>
                    </div>
                    <form>
                        <div className='input-container'>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                        </div>
                    </form>
                    <form id='unit-converter'>
                        <div className='list-container'>
                            <select className='list-style' multiple>
                                <option selected>Square Meter</option>
                                <option value='1'>Square Kilometer</option>
                                <option value='2'>Square Centimeter</option>
                                <option value='3'>Square Millimeter</option>
                                <option value='4'>Square Micrometer</option>
                                <option value='5'>Square Inch</option>
                                <option value='6'>Square Mile</option>
                                <option value='7'>Square Yard</option>
                                <option value='8'>Hectare</option>
                            </select>
                            <select className='list-style' multiple>
                                <option value='1'>Square Meter</option>
                                <option selected>Square Kilometer</option>
                                <option value='2'>Square Centimeter</option>
                                <option value='3'>Square Millimeter</option>
                                <option value='4'>Square Micrometer</option>
                                <option value='5'>Square Inch</option>
                                <option value='6'>Square Mile</option>
                                <option value='7'>Square Yard</option>
                                <option value='8'>Hectare</option>
                            </select>
                        </div>
                    </form>
                </Panel>

                {/* Data */}
                <Panel>
                    <div className='panel-container'>
                        <p className='panel-style'>FROM:</p>
                        <p className='panel-style'>TO:</p>
                    </div>
                    <form>
                        <div className='input-container'>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                        </div>
                    </form>
                    <form id='unit-converter'>
                        <div className='list-container'>
                            <select className='list-style' multiple>
                                <option selected>Kilobyte</option>
                                <option value='1'>Megabyte</option>
                                <option value='2'>Gigabyte</option>
                                <option value='3'>Terabyte</option>
                            </select>
                            <select className='list-style' multiple>
                                <option value='1'>Kilobyte</option>
                                <option selected>Megabyte</option>
                                <option value='2'>Gigabyte</option>
                                <option value='3'>Terabyte</option>
                            </select>
                        </div>
                    </form>
                </Panel>

                {/* Time */}
                <Panel>
                    <div className='panel-container'>
                        <p className='panel-style'>FROM:</p>
                        <p className='panel-style'>TO:</p>
                    </div>
                    <form>
                        <div className='input-container'>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                        </div>
                    </form>
                    <form id='unit-converter'>
                        <div className='list-container'>
                            <select className='list-style' multiple>
                                <option selected>Second</option>
                                <option value='1'>Millisecond</option>
                                <option value='2'>Microsecond</option>
                                <option value='3'>Nanosecond</option>
                                <option value='4'>Picosecond</option>
                                <option value='5'>Minute</option>
                                <option value='6'>Hour</option>
                                <option value='7'>Day</option>
                                <option value='8'>Year</option>
                            </select>
                            <select className='list-style' multiple>
                                <option value='1'>Second</option>
                                <option selected>Millisecond</option>
                                <option value='2'>Microsecond</option>
                                <option value='3'>Nanosecond</option>
                                <option value='4'>Picosecond</option>
                                <option value='5'>Minute</option>
                                <option value='6'>Hour</option>
                                <option value='7'>Day</option>
                                <option value='8'>Year</option>
                            </select>
                        </div>
                    </form>
                </Panel>

                {/* Temperature */}
                <Panel>
                    <div className='panel-container'>
                        <p className='panel-style'>FROM:</p>
                        <p className='panel-style'>TO:</p>
                    </div>
                    <form>
                        <div className='input-container'>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                            <div>
                                <input type='text' className='input-style' />
                            </div>
                        </div>
                    </form>
                    <form id='unit-converter'>
                        <div className='list-container'>
                            <select className='list-style' multiple>
                                <option selected>Celsius</option>
                                <option value='1'>Kelvin</option>
                                <option value='2'>Fahrenheit</option>
                            </select>
                            <select className='list-style' multiple>
                                <option value='1'>Celsius</option>
                                <option selected>Kelvin</option>
                                <option value='2'>Fahrenheit</option>\
                            </select>
                        </div>
                    </form>
                </Panel>
            </div>
        </Tabs>
    );
};

export default UnitConverter;
