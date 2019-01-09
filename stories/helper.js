import Chance from 'chance';
const chance = new Chance();

export function modelPropsGen() {
  return {
    visible: chance.pick([true, false])
  };
}

