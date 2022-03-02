// Title: SimpleOscillator
// Description: Oscillator with pitch and waveforms
// Hardware: Daisy Pod
// Author: Stephen Hensley
// Controls:
// Knob 1: Oscillator pitch
// Encoder: Waveform select. Sine, tri, saw, square
// Button 1: Octave down
// Button 2: Octave up
// Diagram:
// https://raw.githubusercontent.com/electro-smith/DaisyExamples/master/pod/SimpleOscillator/resources/SimpleOscillator.png

#include "DaisyDuino.h" // this is the include file for the daisy API

#define NUM_WAVEFORMS 4

DaisyHardware hw; // this is the chip
Oscillator osc; // this seems to be an oscillator

uint8_t waveforms[NUM_WAVEFORMS] = {
    Oscillator::WAVE_SIN,
    Oscillator::WAVE_TRI,
    Oscillator::WAVE_POLYBLEP_SAW,
    Oscillator::WAVE_POLYBLEP_SQUARE,
};

static float freq; // this is the frequency
static float amp; // this is the amplitude
float sig;
static int waveform, octave;

static void AudioCallback(float **in, float **out, size_t size) {
  hw.DebounceControls(); // you just do this before you read stuff

  waveform += hw.encoder.Increment();
  waveform = (waveform % NUM_WAVEFORMS + NUM_WAVEFORMS) % NUM_WAVEFORMS;
  osc.SetWaveform(waveforms[waveform]);

  if (hw.buttons[1].RisingEdge())
    octave++;
  if (hw.buttons[0].RisingEdge())
    octave--;
  octave = DSY_CLAMP(octave, 0, 4);

  // convert MIDI to frequency and multiply by octave size
  freq = analogRead(PIN_POD_POT_1) / 1023.f;
  freq = mtof(freq * 127 + (octave * 12));
  osc.SetFreq(freq);

  amp = analogRead(PIN_POD_POT_2) / 1023.f;

  // Audio Loop
  for (size_t i = 0; i < size; i++) {
    // Process
    sig = osc.Process();
    out[0][i] = sig*amp; // left side
    out[1][i] = sig*amp; // right side
  }
}

void InitSynth(float samplerate) {
  osc.Init(samplerate);
  osc.SetAmp(1.f);

  waveform = 0;
  octave = 0;
}

// the setup loop still does soemthing:
void setup() {
  float samplerate, callback_rate;
  
  hw = DAISY.init(DAISY_POD, AUDIO_SR_48K); // initialize the daisy (pod) at 48kHz
  samplerate = DAISY.get_samplerate(); // get the sampling rate into a variable

  hw.leds[0].Set(false, false, false);
  hw.leds[1].Set(false, false, false);

  InitSynth(samplerate); // run a function called initsynth

  DAISY.begin(AudioCallback); // this sets up the main audio callback
}

void loop() {}
