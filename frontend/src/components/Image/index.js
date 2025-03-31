import classNames from 'classnames/bind';
import styles from './Image.module.scss'
import images from '~/assets/images'
import { forwardRef } from 'react';

const cx = classNames.bind(styles)

function Image({ src, alt, className, ...props }, ref) {

    const classes = cx('wrapper', className)

    return (
        <img
            ref={ref}
            className={classes}
            src={src || images.avatar}
            alt={alt}
            {...props}
        />
    );
}

export default forwardRef(Image);