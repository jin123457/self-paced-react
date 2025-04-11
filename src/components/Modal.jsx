import { useEffect } from 'react';

function Modal({ closeRestaurantModal, children }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeRestaurantModal(false);
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
                <div className='modal-backdrop' onClick={() => closeRestaurantModal()}></div>
                <div className='modal-container'>{children}</div>
            </div>
        </>
    );
}

export default Modal;
