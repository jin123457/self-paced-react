import { useEffect } from 'react';

function Modal({ onChangeModal, children }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onChangeModal(false);
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
                <div className='modal-backdrop' onClick={() => onChangeModal()}></div>
                <div className='modal-container'>{children}</div>
            </div>
        </>
    );
}

export default Modal;
