import Image from 'next/image'; 
import styles from './Modal.module.css';
import cross from '@/app/assets/cross.png';

export default function HeroSection({
    children, closeModal
}: {
    children: React.ReactNode,
    closeModal: Function,
}) {
    return (
        <div className={styles.modal_background}>
            <div className={styles.modal}>
                <Image className={styles.modal_cross} src={cross} alt="cross"  onClick={() => closeModal}/>
                {children}
            </div>
        </div>
    )
}