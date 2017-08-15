/* var myHotspotId = "oscars-head";

    window.addEventListener('load', onVrViewLoad)
    function onVrViewLoad() {
        var vrView = new VRView.Player('#vrview', {
           // image: '//storage.googleapis.com/vrview/examples/coral.jpg',
            image: '//virtu.mobi:9000/vrimage/oscars.jpg',
            is_stereo: true,
            width: '100%',
            height: 1000,
            is_debug: true,
        });

        vrView.on('ready',function(){
            vrView.addHotspot(myHotspotId, {
                pitch: 30, // -90 / 90
                yaw: 90, // In degrees. To the right is positive. -180 / 180
                radius:   0.2, // Radius of the circular target in meters.
                distance: 3, // Distance of target from camera in meters.
            });
        });


        vrView.on('click', function(event) {

            if (event.id == myHotspotId) {
               alert('CLICK!')
                // Handle hotspot click.
            }
        });
    }*/