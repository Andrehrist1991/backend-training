import moment from 'moment';

class Order {
  constructor(props) {
    Object.assign(this, props);

    this.raw = props;

    this.id = this._id
    if (this.date) this.date = moment(this.date).format('l');
    if (this.executed) this.executed = moment(this.executed).format('l');
    if (this.name && this.lastName) this.fullName = `${this.name} ${this.lastName}`
  }
}

export default Order;
