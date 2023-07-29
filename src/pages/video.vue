<template>
   
    <!-- <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions">
        </video-player> -->
    <div class="scrollwrapper">
    <div class="wrapper">
    <div class="title">{{ mvDetail.name }}</div>
    <div class="count">
        播放：{{ mvDetail.playCount }}   分享：{{ mvDetail.shareCount }}   收藏：{{ mvDetail.subCount }}   发布时间：{{ mvDetail.publishTime }}
    </div>
    <div class="video">
    <video autoplay controls loop name="media" :src="mvUrl" style="width: 95%;border-radius: 10px;">
        <!-- <source  type="video/mp4"> -->
        您的浏览器不支持 video 标签
    </video>
    <div class="detail">
        
        <div class="artist">
            <div class="aimg"><img :src="mvDetail.artists[0].img1v1Url" alt=""></div>
            <div class="name">{{ mvDetail.artistName }}</div>
        </div>
        <div class="desc" v-if="mvDetail.desc">简介：{{ mvDetail.desc }}</div>
    </div>
    </div>
    <div class="comments">
        <div class="comment" v-for="(item,index) in mvComment" :key="index"> 
        
           <div class="name"><img :src="item.user.avatarUrl" alt="" class="useravatar">{{ item.user.nickname}}
           </div>
           <span class="time">{{formatDate( item.time )}}</span><span class="content">{{ item.content }}</span>
        </div>
    </div>
</div>
</div>
</template>

<script setup lang="ts">
import {getMvUrlApi,  getMvDetailApi,getMvReviewApi} from "@/api/info";
import { MvDetail, mvCommentItem} from "@/utils/types";
import { Ref, ref } from "vue";
import { useRouter } from 'vue-router';
import {formatDate} from "@/utils/fommater";
const router=useRouter();
const mvid=Number(router.currentRoute.value.params.id);
const mvUrl=ref("");
console.log(mvid);
const getMvUrl=async ()=>{
    const out=await getMvUrlApi(mvid);
    mvUrl.value=out.data.url;
    console.log(mvUrl.value);
}

const mvDetail:Ref<MvDetail>=ref({
    name:"",
    artistName:"",
    artists:[
        {img1v1Url:"",
        followed:false,}
    ],
    desc:"",
    playCount:0,
    shareCount:0,
    subCount:0,
    publishTime:"",
});

const  getMvDetail=async ()=>{
    const out=await getMvDetailApi(mvid);
    mvDetail.value=out.data;
}

const mvComment:Ref<mvCommentItem[]>=ref([{
    user:{
        avatarUrl:"",
        nickname:"",
    },
    content:"",
    time:0,
    likedCount:0,
    beReplied:[
        {
            user:{
                avatarUrl:"",
                nickname:"",
            },
            content:"",
        }
    ],
    }]);
const  getMvReview=async ()=>{
    const out=await getMvReviewApi(mvid);
    mvComment.value=out.comments;
}
getMvUrl();
getMvDetail();
getMvReview();
</script>

<style scoped lang="scss">
.scrollwrapper{
    overflow-y: scroll;
    height: 100%;
    .wrapper{
    width: 98%;
    margin: 20px auto;
    .title{
        font-size: 20px;
        font-weight: bold;
        text-align: left;
    }
    .count{
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
        text-align: left;
    }
    .detail{
        .artist{
            display: flex;
            align-items: center;
            margin: 20px;
            .aimg{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .name{
                    font-size: 15px;
                    font-weight: bold;}
        }
        .desc{
            margin: 20px;
            font-size: 15px;
            text-align: left;
        }
    }
    .comments{
        margin: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .comment{
            width: 230px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin: 5px;
            background-color: rgb(146 151 179 / 13%);
            align-items: flex-start;
            .name{
                font-size: 15px;
                display: flex;
                align-items: center;
                padding-bottom: 5px;
                .useravatar{
                width: 30px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
                display: inline;
            }
            }
            .time{
                font-size: 12px;
                color: #999;
                margin-bottom: 5px;
            }
            .content{
                font-size: 13px;
            }

        }
    }
    }
}
 
</style>