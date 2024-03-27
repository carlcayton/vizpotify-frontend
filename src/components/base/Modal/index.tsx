import React from 'react';

interface ModalProps {
  title: string;
  message: string;
}

const Modal = React.forwardRef<HTMLInputElement, ModalProps>(
  ({ title, message }, ref) => {
    return (
      <>
        <input
          type="checkbox"
          id="my_modal_7"
          className="modal-toggle"
          ref={ref}
        />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
              <label htmlFor="my_modal_7" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Modal;