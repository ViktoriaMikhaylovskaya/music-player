import WaveSurfer from 'wavesurfer.js';
import { musicList } from './constants';

const posterNode = document.querySelector('.music-img');
const audioNode = document.querySelector('audio');

const prevMusicButton = document.querySelector('.prev-music');
const nextMusicButton = document.querySelector('.next-music');

let currentMusic = 0;

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#5df9de',
    progressColor: '#1e594f',
    scipLength: 5,
    barGap: 1.5,
    barWidth: 2,
});

const createMusicCard = (musicInfo) => {
    wavesurfer.setMuted(true);
    wavesurfer.load(musicInfo.music);

    audioNode.src = musicInfo.music;
    posterNode.src = musicInfo.img;
};

wavesurfer.on('interaction', (newTime) => {
    audioNode.currentTime = newTime;
});


const initPlayer = () => { 
    createMusicCard(musicList[currentMusic]);

    audioNode.addEventListener('play', () => {
        wavesurfer.playPause();
    });

    audioNode.addEventListener('pause', () => {
        wavesurfer.playPause();
    });

    audioNode.addEventListener('timeupdate', () => {
        wavesurfer.setTime(audioNode.currentTime);
    });

    prevMusicButton.addEventListener('click', () => {
        console.log('-',currentMusic);
        currentMusic--;
        console.log('-',currentMusic);
        createMusicCard(musicList[currentMusic]);
        if (currentMusic === 0) {
            prevMusicButton.disabled = true;
            currentMusic = 0;
        } else { 
            prevMusicButton.disabled = false; 
            nextMusicButton.disabled = false;
        }
    });

    nextMusicButton.addEventListener('click', () => {
        console.log('+',currentMusic);
        currentMusic++;
        console.log('+',currentMusic);
        if (currentMusic === musicList.length - 1) {
            nextMusicButton.disabled = true;
            prevMusicButton.disabled = false;
        } else { 
            nextMusicButton.disabled = false;
        }
        prevMusicButton.disabled = false;
        createMusicCard(musicList[currentMusic]);
    });
}

export default initPlayer;