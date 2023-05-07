import {create} from 'twrnc';

const tw = create(require(`../tailwind.config.js`));

export default tw;

export const styles = {
  centerBody: tw`flex-1 items-center justify-center bg-color1`,
  topBody: tw`flex-1 items-center bg-color1 pt-10`,
}
