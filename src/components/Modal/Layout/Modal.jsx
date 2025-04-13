import { useEffect } from 'react';

function Modal({ onCloseModal, children }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCloseModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <>
            <div className='modal modal--open'>
                <div className='modal-backdrop' onClick={() => onCloseModal()}></div>
                <div className='modal-container'>{children}</div>
            </div>
        </>
    );
}

export default Modal;
