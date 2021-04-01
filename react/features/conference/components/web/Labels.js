// @flow

import React from 'react';

import { JitsiRecordingConstants } from '../../../base/lib-jitsi-meet';
import { connect } from '../../../base/redux';
import { E2EELabel } from '../../../e2ee';
import { LocalRecordingLabel } from '../../../local-recording';
import { RecordingLabel } from '../../../recording';
import { TranscribingLabel } from '../../../transcribing';
import { shouldDisplayTileView } from '../../../video-layout';
import { VideoQualityLabel } from '../../../video-quality';

import { InsecureRoomNameLabel } from '.';

declare var interfaceConfig: Object;

type Props = {

    /**
     * Whether to show video quality label or not.
     */
     _showVideoQualityLabel: boolean
}

/**
 * A container to hold video status labels, including recording status and
 * current large video quality.
 *
 * @param {Object} props - The props of the component.
 * @returns {React$Element}
 */
function Labels(props: Props) {
    return (
        <>
            <E2EELabel />
            <RecordingLabel mode = { JitsiRecordingConstants.mode.FILE } />
            <RecordingLabel mode = { JitsiRecordingConstants.mode.STREAM } />
            <LocalRecordingLabel />
            <TranscribingLabel />
            { props._showVideoQualityLabel && <VideoQualityLabel /> }
            <InsecureRoomNameLabel />
        </>
    );
}

/**
 * Maps (parts of) the redux state to the associated props of the {@link Labels}
 * {@code Component}.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {{
 *     _filmstripVisible: boolean,
 *     _showVideoQualityLabel: boolean
 * }}
 */
function _mapStateToProps(state: Object) {
    return {
        _showVideoQualityLabel: !(shouldDisplayTileView(state) || interfaceConfig.VIDEO_QUALITY_LABEL_DISABLED)
    };
}

export default connect(_mapStateToProps)(Labels);
