console.log('📕 generate sound');


function generateSounds(posX, posY) {

    let soundX = convertRange(posX, [0, 600], [-60, 60])
    let soundY = convertRange(posY, [0, 600], [-60, 60])
    if (sentimentContainer[sentanceNumber] >= 0) {
        // sentiment is positive

        // for these animals play this synth
        if ((currIllustration == 'lion') || (currIllustration == 'skull') || (currIllustration == 'dog') || (currIllustration == 'bear')) {
            // each 25th pen stroke

            let noteLenngth = noteLength(soundX);
            if (noteLenngth == undefined) {
                noteLenngth = '6n';
            }
            const notetoplayMajor = convertDiamToNoteMajor(soundY) / 4;
            playNote2(noteLenngth, notetoplayMajor);

        } else {
            // play this synth each 12th stroke

            let noteLenngth = noteLength(soundX);
            if (noteLenngth == undefined) {
                noteLenngth = '6n';
            }
            playNote1(noteLenngth, convertDiamToNoteMajor(soundY) * 2);

        }
    } else {
        // Sentiment is negeative

        // for these animals play this synth
        if ((currIllustration == 'lion') || (currIllustration == 'dog') || (currIllustration == 'skull') || (currIllustration == 'bear')) {
            // each 25th pen stroke

            let noteLenngth = noteLength(soundX);
            if (noteLenngth == undefined) {
                noteLenngth = '6n';
            }

            const notetoplayMinor = convertDiamToNoteMinor(soundY) / 4;
            playNote2(noteLenngth, notetoplayMinor);

        } else {
            // play this synth each 12th stroke

            let noteLenngth = noteLength(soundX);
            if (noteLenngth == undefined) {
                noteLenngth = '6n';
            }
            playNote1(noteLenngth, convertDiamToNoteMinor(soundY) * 2);

        }
    }
}
