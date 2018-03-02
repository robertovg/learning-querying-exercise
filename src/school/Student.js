import Base from './Base';

export default class Student extends Base {
  constructor({ name }) {
    super();
    this.name = name;
  }
}
