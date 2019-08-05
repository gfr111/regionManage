<template>
    <div class="warpper">
        <div class="regionBox" :style="{height:height}">
            <div class="headerBox">
                <div class="leftBox">
                    <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png" class="returnIcon" @click="returnMain"/>
                    <text style="color:#ffffff;" @click="returnMain">设置区域负责人</text>
                </div>
            <text class="rightBox">取消</text>
            </div>
            <list :style="{height:height-120}" class="scroller">
                <cell>
                    <div class="centerBox" >                  
                            <list class="centerScroll" v-if="list.length!=0">
                                <cell class="cell" v-for="(item,index) in list" :key="index" >
                                    <div class='swiperBox'>
                                        <div ref="itemDev" @swipe="handleSwipe($event,index)" class='swiperItem'>
                                            <div class="centerItem">
                                                <img :src="item.trainerPhoto==null?'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultWoman.png':item.trainerPhoto"  class="personIcon"/>
                                                <div class="centerMess">
                                                    <text class="centerName">{{item.trainerName}}</text>
                                                    <text class="centerPhone">{{item.trainerPhone}}</text>
                                                </div>
                                            </div> 
                                            <div class='swiperBtn'>                                             
                                                <div class="remove" @click="removeItem(item.regionTrainerId,index)">
                                                    <text style="color:#FFFFFF;font-size:19px;">移除</text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                 
                                </cell>
                            </list>
                            <div v-else class="emptyBox" :style="{height:height-120,visibility: componentVisibility}">
                                <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png" class="emptyIcon"/>
                                <text class="emptyTxt">这片区域无人管辖</text>
                            </div> 
                    </div>                           
                </cell>
            </list>
            <div class="bottomBox">
                <text class="addAdmin" @click="addAdminEvent">添加负责人</text>
            </div>
        </div>
        <div class="bg" v-if="showDeleteRegion" :style="{height:height}"  @click="hideDeleteRegion">
            <div class="addregionBox" @click="empty">
                <text class="addReginTxt">确认要删除当前负责人么？</text>       
                <div class="regionBtnBox">
                    <text class="cencelAdd" @click="hideDeleteRegion">取消</text>
                    <text class="submitAdd" @click="submitDeleteRegion">确认</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var modal=weex.requireModule("modal");
    const storage = weex.requireModule('storage');
     const animation = weex.requireModule('animation');
      var stream = weex.requireModule('stream'); 
      var nativeMoudle= weex.requireModule('nativeModule');
    export default {
        data(){
            return{
                list:[],
                height:'',
                showDeleteRegion:'',
                regionId:'',
                nowIndex:-1,
                deleteIndex:'',
                token:'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
                webHost:'http://10.0.0.216:9090',
                actionRegionId:null,
                popHeight:'',
                componentVisibility: 'hidden'
            }
        },
        created(){
            var that=this;
            nativeMoudle.showProgressDialog();  
             that.height =750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight+30;
            that.regionId=that.$route.query.id;
             nativeMoudle.getMetaData(function(map){
                that.token=map.token;       
            });
             setTimeout(() => {
                that.getCoachList();
            }, 50);
            weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
               that.returnMain();
            })
        },
        methods:{
        returnMain(){
            this.$router.go(-1);
        },
        empty(){},
        hideDeleteRegion(){
            this.showDeleteRegion=false; 
        },
        submitDeleteRegion(){           
               var that=this;   
               nativeMoudle.showProgressDialog();             
                stream.fetch({
                    method: 'DELETE',
                    url: that.webHost+'/api/region/trainer/delete/'+that.actionRegionId,
                    type:'json',
                    headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    }
                    }, function(ret) {
                    if(ret.ok){           
                         nativeMoudle.progressDialogDismiss();  
                            if(ret.data.status==0){
                                  nativeMoudle.toastSuccess('删除成功');            
                                 that.showDeleteRegion=false;                            
                                setTimeout(() => {
                                    that.goRight(that.deleteIndex,0);
                                    that.list.splice(that.deleteIndex, 1);
                                    that.getCoachList();                                   
                                }, 500);
                            }else{
                              nativeMoudle.toastError(ret.data.message);
                             that.showDeleteRegion=false;  
                            }
                    }else{
                        nativeMoudle.toastError('网络错误！')
                    }
                
                    },function(response){
                });
        },
        getCoachList(){
            var that=this;
            nativeMoudle.showProgressDialog();  
            stream.fetch({
            method: 'GET',
            url: that.webHost+'/api/region/trainer/1/list/'+that.regionId,
            type:'json',
            headers:{
                "Content-Type": 'application/json',
                'X-AUTH-TOKEN':that.token
            }
            }, function(ret) {             
                if(ret.ok){    
                     nativeMoudle.progressDialogDismiss();
                    if(ret.data.status==0){
                        that.list=[];
                         var list=ret.data.data;                  
                         for(var i=0,len=list.length;i<len;i++){
                             if(list[i].authType!=5){
                                 that.list.push(list[i])
                             }
                         }
                         if(that.list.length==0){
                             that.componentVisibility = 'visible';
                         } 
                    }else{
                         nativeMoudle.toastError(ret.data.message);
                    }
                }else{
                 nativeMoudle.toastError('网络错误！')
                }
            
            },function(response){
            }); 
        },
         handleSwipe (e , index) {
            if (e.direction == "left") {
                 this.goRight(this.nowIndex);
                this.goLeft(index);
            } else if (e.direction == "right"){
                this.goRight(index);
            }
            // modal.toast({message:"==" + e.direction + "==" + index, duration:1});
        },
        goLeft(index){
            let itemEl = this.$refs.itemDev[index];
            //第二左滑条目与前一次左滑条目相同时，不处理
            if (index == this.currentIndex){
                return;
            }
            //当前有划出的条目的时候，左滑其他条目，当前的条目归位，
            if (this.currentIndex != -1){
                this.goRight(this.currentIndex);
            }
            //左滑当前条目
            if (this.currentIndex != index){
                animation.transition(itemEl,{
                    styles: {
                        transform: 'translate(-94px, 0px)',
                        transformOrigin: 'center center'
                    },
                    duration: 200, //ms
                    timingFunction: 'linear',
                    delay: 0 //ms
                },function () {
                });
                this.currentIndex = index;
                this.nowIndex=index;
            }
        },
        //time是动画时间，给个默认值 200毫秒，不传就表明这个值为200毫秒
        goRight(index,time = 200){
            let itemEl = this.$refs.itemDev[index];
            animation.transition(itemEl,{
                styles: {
                    transform: 'translate(0px, 0px)',
                    transformOrigin: 'center center'
                },
                duration: time, //动画时间
                timingFunction: 'linear',//线性运动
                delay: 0 //ms
            },function () {
            });
            this.currentIndex = -1;
        },
        //点击删除
        removeItem(id,index){
            this.showDeleteRegion=true; 
            this.deleteIndex=index;
            this.actionRegionId=id;
        },
        addAdminEvent(){
               var that=this;
               that.$router.push({name:'chooseAdmin',query:{areaId:that.regionId}});
        }
    }
}
</script>
<style scoped>
.swiperBox{
        width: 750px; 
        height:93px; 
    }
    .swiperItem{
       flex-direction: row; 
       width: 844px;
    }
    .swiperBtn{
        width: 94px; 
        height: 93px; 
        flex-direction: row;
    }
     .remove{
            width: 94px; 
            height: 93px; 
            align-items: center;
            justify-content: center;
            background-color: #E65142;
            color: #ffffff;
            font-size: 19px;
    }
    .regionBox{
        background-color: #F6F6F6;
    }
    .centerScroll{
        width: 750px;
        background-color: #ffffff;
    }
    .headerBox{
        width: 750px;
        height: 70px;
        align-items: center;
        background-color: #4C5160;
        justify-content: space-between;
        padding-left: 19px;
        padding-right: 19px;
        flex-direction: row;
    }
    .leftBox{
        align-items: center;
        justify-content: space-between;
        color: #ffffff;
        flex-direction: row;
    }
    .returnIcon{
       width: 28px;
       height: 28px; 
       margin-right: 8px;
    }
    .rightBox{
      color: #4C5160;
      font-size: 19px;
    }
    .centerItem{
        height: 93px;
        width:750px;
        border-bottom-width: 1px;
        border-bottom-color: #F6F6F6;
        border-bottom-style: solid;
        flex-direction: row;
        align-items: center;
    }
    .personIcon{
        width: 41px;
        height: 41px;
        margin-right: 14px;
        margin-left: 24px;
        border-radius: 100px;
    }
    .centerName{
        color: #333333;
        font-size: 19px;
    }
    .centerPhone{
        color: #999999;
        font-size: 16px;
    }
    .bottomBox{
        position: absolute;
        bottom: 0px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #CCCCCC;
        width: 750px;
        height: 60px;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        flex-direction: row;
    }
    .addAdmin{
        width: 750px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        background-color: #108EE9;
        color: #ffffff;
    }
    .emptyBox{
        width: 750px;
        align-items: center;
        justify-content: center;
        border-top-style: solid;
        border-top-width: 10px;
        border-top-color: #F6F6F6;
        background-color: #ffffff;
    }
    .emptyIcon{
        width: 455px;
        height: 233px;
    }
    .emptyTxt{
        color: rgba(0, 0, 0, 0.45);
        font-size: 23px;
    }
    .bg{
        background-color:rgba(0, 0, 0, 0.6);
        position: absolute;
        top:0;
        left: 0;
        width: 750px;
        justify-content: center;
        align-items: center;
    }
    .addregionBox{
        width: 516px;
        height: 263px;
        background-color: #ffffff;
        border-radius: 6px;
        align-items: center;
    }
    .addReginTxt{
        color: #333333;
        font-size: 30px;
        margin-top:61px;
        margin-bottom: 50px;
        width: 516px;
        text-align: center;
    }
    .regionBtnBox{
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .cencelAdd{
        width: 195px;
        height: 56px;
        border-color: #DCDCDC;
        border-style: solid;
        border-width: 1px;
        border-radius: 30px;
        text-align: center;
        line-height: 58px;
        color: #666666;
        font-size: 19px;
        margin-right: 28px;
    }
    .submitAdd{
        width: 195px;
        height: 56px;
        border-color: #1890FF;
        background-color: #1890FF;
        border-style: solid;
        border-width: 1px;
        border-radius: 30px;
        text-align: center;
        line-height: 58px;
        color: #ffffff;
        font-size: 19px;
    }
</style>


