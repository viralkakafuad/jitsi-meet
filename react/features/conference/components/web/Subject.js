/* @flow */

import React, { Component } from 'react';

import { getConferenceName } from '../../../base/conference/functions';
import { getParticipantCount } from '../../../base/participants/functions';
import { connect } from '../../../base/redux';
import { isToolboxVisible } from '../../../toolbox/functions.web';
import ConferenceTimer from '../ConferenceTimer';
import Labels from './Labels';

import ParticipantsCount from './ParticipantsCount';

/**
 * The type of the React {@code Component} props of {@link Subject}.
 */
type Props = {

    /**
     * Whether the conference timer should be shown or not.
     */
    _hideConferenceTimer: Boolean,

    /**
     * Whether the participant count should be shown or not.
     */
    _showParticipantCount: boolean,

    /**
     * Whether the conference subject should be shown or not.
     */
    _showSubject: boolean,

    /**
     * The subject or the of the conference.
     * Falls back to conference name.
     */
    _subject: string,

    /**
     * Indicates whether the component should be visible or not.
     */
    _visible: boolean
};

/**
 * Subject react component.
 *
 * @class Subject
 */
class Subject extends Component<Props> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _hideConferenceNameAndTimer, _hideConferenceTimer, _showParticipantCount, _showSubject, _subject, _visible } = this.props;
        let className = `subject ${_visible ? 'visible' : ''}`;
        const hideLabels = false

        return (
            <div className = { className }>
               { !_hideConferenceNameAndTimer
                 && <div className = 'subject-info'>
                  { _showSubject && <span className = 'subject-text'>{ _subject }</span>}
                  { !_hideConferenceTimer && <ConferenceTimer /> }
                    </div>}
                { _showParticipantCount && <ParticipantsCount /> }
                { hideLabels || <Labels /> }
            </div>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated
 * {@code Subject}'s props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _hideConferenceTimer: boolean,
 *     _showParticipantCount: boolean,
 *     _showSubject: boolean,
 *     _subject: string,
 *     _visible: boolean
 * }}
 */
function _mapStateToProps(state) {
    const participantCount = getParticipantCount(state);
    const { hideConferenceTimer, hideConferenceSubject, hideParticipantsStats } = state['features/base/config'];
    const { clientWidth } = state['features/base/responsive-ui'];

    return {
        _hideConferenceNameAndTimer: clientWidth < 300,
        _hideConferenceTimer: Boolean(hideConferenceTimer),
        _showParticipantCount: participantCount > 2 && !hideParticipantsStats,
        _showSubject: !hideConferenceSubject,
        _subject: getConferenceName(state),
        _visible: isToolboxVisible(state)
    };
}

export default connect(_mapStateToProps)(Subject);
