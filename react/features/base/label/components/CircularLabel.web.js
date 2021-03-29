// @flow

import React from 'react';

import Icon from '../../icons/components/Icon';

import AbstractCircularLabel, {
    type Props as AbstractProps
} from './AbstractCircularLabel';

type Props = AbstractProps & {

    /**
     * Additional CSS class names to add to the root of {@code CircularLabel}.
     */
    className: string,

    /**
     * HTML ID attribute to add to the root of {@code CircularLabel}.
     */
    id: string

};

/**
 * React Component for showing short text in a circle.
 *
 * @extends Component
 */
export default function CircularLabel(props: Props) {
        const {
            className,
            icon,
            id,
            label
        } = props;

    const labelClassName = icon ? 'label-text-with-icon' : ''

        return (
            <div
                className = { `label ${className}` }
                id = { id }>
                { icon
                  && <Icon size = '16'
                           src = { icon } />}
                { label && <span className = { labelClassName }>{label}</span> }
            </div>
        );
}
