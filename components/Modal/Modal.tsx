import { Fragment, useRef, useState } from 'react'
import { Dialog , Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import styles from './Modal.module.scss';

interface ModalProps{
  title:string;
  note:string;
  explain:string;
}
const Modal:React.FC<ModalProps>=({title,note,explain})=> {
    return (
      <div className={styles.container}>
        <h4>{title}</h4>
        <span>{`資料來源：${note}`}</span>
        <p>{`說明：${explain}`}</p>
      </div>
    );
};

export default Modal;