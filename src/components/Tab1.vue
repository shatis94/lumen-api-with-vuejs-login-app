<template>
    <div class="container">
        <div class="col-12 py-4">
            <h5>Video Stream Example</h5>
            <div class="row">
                <div class="card col-md-3 m-1 p-0">
                    <div class="card-header">
                        Client Room
                    </div>
                    <div class="card-body">
                        <ul>
                            <li class="d-block" v-for="(room, index) in rooms" :key="index">
                                <a href="javascript:void(0)" @click="join(room)">{{ room }}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="card col-md-8 m-1 p-0 bg-dark">
                    <div class="card-body">
                        <div id="video_grid"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        rooms:{
            type: Array,
            default: () => ['Room 01','Room 02','Room 03','Room 04']
        }
    },
    data(){
        return {
            video_grid:'',
            myVideo:'',
            myVideoStream:'',
        }
        
    },
    mounted(){
        let video = document.createElement('video');
        this.video_grid = document.getElementById('video_grid');
        video.style.width = "250px";
        video.style.height = "250px";
        this.myVideo = video;
    },
    created(){
        this.$socket.on('join-room', (roomId, id)=>{
            this.$socket.join(roomId);
            this.$socket.to(roomId).broadcast.emit('user-connected', id);
            console.log(`New User Joined ${id}`);
        });
    },
    methods:{
        async join(roomId){
            await navigator.mediaDevices.getUserMedia({
                video:true,
                audio: true
            }).then( (stream) => {
                this.myVideoStream = stream;
                this.addVideoStream(this.myVideo, stream);

                this.$socket.on('user-connected', (id)=>{
                    console.log('user connected ' + id);
                    connecNewUser(id, stream);
                })
                
            });
            // this.$peer.on('open', id =>{
            //     alert('peer open');
            this.$socket.emit('join-room', roomId, (Math.random() * 1000) );
            // })

        },
        addVideoStream(video, stream){
            video.srcObject = stream;
            video.addEventListener('loadedmetadata', ()=>{
                video.play();
            })
            this.video_grid.append(video);
        },
        connecNewUser(id, stream){
            // const call = peer.call(id, stream);
            const video = document.createElement('video');
            // call.on('stream', stream => {
                addVideoStream(video, stream);
                console.log('call is open');
            // })
        }
        
    }
}
</script>

