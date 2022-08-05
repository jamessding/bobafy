import React from 'react';

export default function Hours({ hours }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let counter = 0;
  const times = ['', '', '', '', '', '', ''];
  for (let i = 0; i < hours.length; i++) {
    const startHour = hours[i].start.slice(0, 2);
    const startMinutes = hours[i].start.slice(-2);
    const endHour = hours[i].end.slice(0, 2);
    const endMinutes = hours[i].end.slice(-2);
    const startAmOrPm = startHour >= 12 ? 'PM' : 'AM';
    const endAmOrPm = endHour >= 12 ? 'PM' : 'AM';
    if (hours[i].day === counter) {
      times[counter] += ' ' + ((startHour % 12) || 12) + ':' + startMinutes + ' ' + startAmOrPm + ' - ' + ((endHour % 12) || 12) + ':' + endMinutes + ' ' + endAmOrPm;
    } else {
      counter++;
      i--;
    }
  }
  for (let j = 0; j < days.length; j++) {
    if (times[j] === '') {
      times[j] = 'Closed';
    }
  }
  counter = 0;
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Hours</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <table className='table table-borderless'>
              <tbody>
                {
                  times.map(time =>
                    <tr key={days[counter]}>
                      <td>{`${days[counter++]}:`}</td>
                      <td>{time}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
