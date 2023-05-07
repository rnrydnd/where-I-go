export default interface Keyword {
  keyword: string;
  totalScore: number;
  scoreHistory: number[];
  createDate: Date;
  deleteDate: Date|undefined;
}