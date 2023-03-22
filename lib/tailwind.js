import { create } from 'twrnc';

const tw = create(require(`../tailwind.config.js`));

export default tw;

export const styles = {
  centerBody: tw`p-10 flex-1 items-center justify-center bg-color1`,
  topBody: tw`p-10 flex-1 items-center bg-color1`,
}