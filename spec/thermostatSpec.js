'use strict';

describe('Thermostat', function(){

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at 20 degrees', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  it('increase in temperature with up()', function() {
    thermostat.up();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('decrease in temperature with down()', function() {
    thermostat.down();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it('has a minimum of 10 degree', function() {
    for (var i = 0; i < 11; i++) {
      thermostat.down();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(10);
  })

  it('saving mode on', function(){
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  it('can switch PSM off', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
  });

  it('can switch PSM back on', function() {
    thermostat.switchPowerSavingModeOff();
    expect(thermostat.isPowerSavingModeOn()).toBe(false);
    thermostat.switchPowerSavingModeOn();
    expect(thermostat.isPowerSavingModeOn()).toBe(true);
  });

  describe('when power saving mode is on', function() {
    it('has a maximum temperature of 25 degrees', function() {
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(25);
    });
  });

  describe('when power saving mode is off', function() {
    it('maximum temperature of 32 degrees', function() {
      thermostat.switchPowerSavingModeOff();
      for (var i = 0; i < 13; i++) {
        thermostat.up();
      }
      expect(thermostat.getCurrentTemperature()).toEqual(32);
    });
  });

  it('can be reset to the default', function(){
    for (var i = 0; i < 6; i++) {
      thermostat.up();
    }
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(20);
  });

  describe('displaying usage levels', function() {
    describe('when the temperature is below 18', function(){
      it('it is considered low-usage', function() {
        for (var i = 0; i < 3; i++) {
          thermostat.down();
        }
   
      expect(thermostat.energyUsage()).toEqual('low-usage');
    });
  });
  describe('when the temperature is between 18 to 25', function() {
    it('it is high', function() {
      thermostat.powerSavingMode = false;
      for (var i = 0; i < 6; i++) {
        thermostat.up();
      } 
expect(thermostat.energyUsage()).toEqual('high-usage');
    });
  });
});

});