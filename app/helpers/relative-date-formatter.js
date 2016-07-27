import Ember from 'ember';
import moment from 'moment';

export function relativeDateFormatter([date], { relative }) {
  const old = moment().diff(date, 'days');
  const time = old ? formatDate(date) : formatTime(date);
  let result = time;
  if (relative) {
    result = result + ` (${relativeTime(date)})`;
  }
  return result;
}

function relativeTime(date) {
  const result = moment(date).fromNow();
  return result.replace(/^(an|a) /, '1 ');
}

function formatTime(date) {
  return moment(date).format('h:mm A');
}

function formatDate(date) {
  return moment(date).format('MMM D');
}

export default Ember.Helper.helper(relativeDateFormatter);
