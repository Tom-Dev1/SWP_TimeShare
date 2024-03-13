import Swal from 'sweetalert2';
import './btnCheckin.css';
import { UpdateBookingStatus } from '../../API/APIConfigure';
import { useParams } from 'react-router-dom';
function ButtonCheckin({ bookingStatus, startDay, endDay }) {
  const id = useParams();
  const handleClick = ({ idBooking, status }) => {
    Swal.fire({
      title: 'Bạn có muốn check in?',
      showDenyButton: true,
      confirmButtonText: `Có`,
      denyButtonText: `Không`,
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          console.log(status);
          UpdateBookingStatus(idBooking.id, status);
          console.log(idBooking.id);
          Swal.fire({
            icon: 'success',
            title: 'Check in thành công',
          }).then(() => {
            window.location.reload();
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Hủy thất bại',
          });
          console.error(err);
        }
      }
    });
  };
  return (
    <div>
      {bookingStatus == '2' && new Date() >= new Date() && new Date() <= new Date() && (
        <button className="btn-checkin" onClick={() => handleClick({ idBooking: id, status: '4' })}>
          Check In
        </button>
      )}
    </div>
  );
}

export default ButtonCheckin;
