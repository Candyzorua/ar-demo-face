declare var WebARRocksMirror: any;

import { Component } from '@angular/core';
import { VtoService } from 'src/services/vto-service/vto.service';

@Component({
    selector: 'app-glasses',
    templateUrl: './glasses.component.html',
    styleUrls: ['./glasses.component.scss']
})
export class GlassesComponent {
    private initParams: any;

    constructor(
      private vtoService: VtoService
    ){
      this.vtoService.changeMode('glasses');
    }

    ngOnInit() {
        const canvasFace = document.getElementById('WebARRocksFaceCanvas');
        const canvasThree = document.getElementById('threeCanvas');

        this.initParams = {
            //videoURL: '../../../../testVideos/1056010826-hd.mp4', // use a video from a file instead of camera video

            solvePnPImgPointsLabels: [
                'leftEarBottom',
                'rightEarBottom',
                'noseBottom',
                'noseLeft', 'noseRight',
                'leftEyeExt',
                'rightEyeExt'
            ],

            specWebARRocksFace: {
                NNCPath: '../../neuralNets/NN_GLASSES_9.json',
                scanSettings: {
                    threshold: 0.8,
                    //translationScalingFactors: [0.07, 0.07, 0.1]
                },
                maxFacesDetected: 1
            },

            landmarksStabilizerSpec: {
                beta: 10,
                minCutOff: 0.001,
                //dcutoff: 1,
                freqRange: [2, 144],
                forceFilterNNInputPxRange: [2.5, 6],//[1.5, 4],
            },

            canvasFace: canvasFace,
            canvasThree: canvasThree,

            // initial canvas dimensions:
            //width: window.innerWidth, // fullscreen
            width: (window.innerWidth > window.innerHeight) ? window.innerHeight * (9 / 16) : window.innerWidth,// always portrait mode (fullscreen on mobile, cropped on desktop)
            height: window.innerHeight,

            // Branch fading parameters (branch become transparent near the ears)
            branchFadingZ: -0.9, // where to start branch fading. - -> to the back
            branchFadingTransition: 0.6, // 0 -> hard transition

            // Branch bending (glasses branches are always bent to slightly tighten the head):
            branchBendingAngle: 5, //in degrees. 0 -> no bending
            branchBendingZ: 0, //start brench bending at this position. - -> to the back

            // The occluder is a placeholder for the head. It is rendered with a transparent color
            // (only the depth buffer is updated).
            // It is useful to hide the left glasses branch when the head turns on the left.
            occluderURL: "assets/3d-models/occluder.glb",
            modelURL: "assets/3d-models/glasses1.glb", //initial model loaded. false or null -> no model
            envmapURL: "assets/envmaps/venice_sunset_1k.hdr",

            // lighting:
            pointLightIntensity: 0.5, //intensity of the point light. Set to 0 to disable
            pointLightY: 200, // larger -> move the pointLight to the top
            hemiLightIntensity: 0, // intensity of the hemispheric light. Set to 0 to disable (not really useful if we use an envmap)

            // bloom (set to null to disable):
            bloom: {
                threshold: 0.8, //0.99,
                strength: 10,
                radius: 1
            },

            // temporal anti aliasing - Number of samples. 0 -> disabled:
            taaLevel: 3,

            // debug flags - all should be false for production:
            debugLandmarks: false,
            debugOccluder: false
        }
        this.main();
    }


    main() {
        // init WebAR.rock.mirror:
        WebARRocksMirror.init(this.initParams).then(function () {
            console.log('WebARRocksMirror initialized successfully');

            // handle orientation change or window resizing:
            const resizeCallback = function () {
                WebARRocksMirror.resize(window.innerWidth, window.innerHeight);
            }
            window.addEventListener('orientationchange', resizeCallback);
            window.addEventListener('resize', resizeCallback);

        }).catch(function (err: any) {
            alert('An error happens with WebARRocksMirror: ' + err.toString());
        });
    }
}
