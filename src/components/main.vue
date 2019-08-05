<template>
    <div class="warpper">
        <div class="regionBox" :style="{height:height}">
            <div class="headerBox">
                <div class="leftBox">
                    <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png" class="returnIcon" @click="close"/>
                    <text style="color:#ffffff;"  @click="close">区域管理</text>
                </div>
                <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteAdd.png" class="addIcon" @click="addRegion"/>
            </div>
            <list :style="{height:height}" >
                <cell>
                    <div class="centerBox" v-if="regionList.length!=0">
                        <div class="centerManage">
                            <text class="centerTxt">区域</text>
                            <div class="manageBtn"></div>
                        </div>
                            <list class="centerScroll">
                                <cell class="cell" v-for="(item,index) in regionList" :key="index" >
                                    <div class='swiperBox' >
                                        <div ref="itemDev" @swipe="handleSwipe($event,index)" class='swiperItem' >
                                            <div  class='regionItem'>
                                                <div class='regionItems'  @click="toSub(item.id,item.parentId)">
                                                    <img  src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/regionIcon.png"  class="centerIcon"/>
                                                    <text class="centerName">{{item.name}}</text>
                                                </div>
                                            </div>              
                                            <div class='swiperBtn'> 
                                                <div class="setting" @click="setAdministrator(item.id)">
                                                    <text style="color:#FFFFFF;font-size:19px;">设置</text>
                                                    <text style="color:#FFFFFF;font-size:19px;">负责人</text>
                                                </div>
                                                <div class="edit" @click="editRegion(item.id,item.name)">
                                                    <text style="color:#FFFFFF;font-size:19px;">编辑</text>
                                                </div>
                                                <div class="remove" @click="removeItem(item.id,index)">
                                                    <text style="color:#FFFFFF;font-size:19px;">删除</text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>             
                                </cell>
                            </list>
                    </div>
                    <div class="centerBox" v-if="clubList.length!=0">
                        <div class="centerManage">
                            <text class="centerTxt">门店</text>
                            <div class="manageBtn" v-if="showChooseCenter">
                                <text class="submitBtn" v-if="centerIdList.length==0">确认</text>
                                <text class="submitBtn" v-else @click="moveRegion">确认({{centerIdList.length}})</text>
                                <text class="cancelBtn" @click="cancelSelect">取消</text>
                            </div>
                            <div class="manageBtn" v-else>
                                <text class="cancelBtn" @click="moveCenterEvent">移动门店</text>
                            </div>
                        </div>
                            <list class="centerScroll">
                            <cell class="cell" v-for="(item,index) in clubList" :key="index"  @click="selectCenter(item.clubId)">
                                <div class="centerItem">
                                    <div class="centerMess">
                                        <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/centerImg.png"  class="centerIcon"/>
                                        <text class="centerName">{{item.clubName||'未命名'}}</text>
                                    </div>
                                    <img :src="item.selected?'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/selected.png':'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptySelected.png'" class="selectedBtn" @click="selectCenter(item.clubId)" v-if="showChooseCenter"/>
                                </div>
                                </cell>
                            </list>
                    </div>
                </cell>
            </list>
        </div>
        <div class="bg" v-if="showAddRegion" :style="{height:popHeight}"  @click="hideAddRegion">
            <div class="addregionBox" @click="empty">
                <text class="addReginTxt">{{title}}</text>
                <div class="nameBox">
                    <input placeholder="请输入区域名称，不超过八个字"  ref="inputText" placeholder-color='#CCCCCC' class="nameInput" v-model="regionName" maxlength="8"/>
                    <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png" class="cancelIcon" v-if="regionName!=''" @click="clearName"/>
                </div>
                <div class="regionBtnBox">
                    <text class="cencelAdd" @click="hideAddRegion">取消</text>
                    <text class="submitAdd" @click="submitAddRegion">确认</text>
                </div>
            </div>
        </div>

        <div class="bg" v-if="showDeleteRegion" :style="{height:popHeight}"  @click="hideDeleteRegion">
            <div class="deleteRegionBox" @click="empty">
                <text class="addReginTxt">确认要删除当前区域么？</text>       
                <div class="regionBtnBox">
                    <text class="cencelAdd" @click="hideDeleteRegion">取消</text>
                    <text class="submitAdd" @click="submitDeleteRegion">确认</text>
                </div>
            </div>
        </div>

    </div>
</template>
<!--需要设置swip-cell的父容器的宽度与swip-cell的宽度一致，
并且对于整体的样式，如圆角等，需要给到组件的父组件-->
<script>
     var modal=weex.requireModule("modal");
     const storage = weex.requireModule('storage');
     const animation = weex.requireModule('animation');
     var stream = weex.requireModule('stream'); 
     var nativeMoudle= weex.requireModule('nativeModule');
    export default {
        data(){
            return{
                regionList:[],
                clubList:[],
                height:'',
                popHeight:'',
                showChooseCenter:false,
                centerIdList:[],
                currentIndex:-1,
                showAddRegion:false,
                regionName:'',
                nowIndex:-1,
                showDeleteRegion:false,
                deleteIndex:'',
                title:'',
                token:'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
                webHost:'http://10.0.0.216:9090',
                overalAreaId:'',
                actionRegionId:''
            }
        },
        mounted(){
             nativeMoudle.showProgressDialog();
        },
        created(){
            var that=this;
            that.height = weex.config.env.deviceHeight;
             nativeMoudle.showProgressDialog();
            that.popHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight+30;        
             nativeMoudle.getMetaData(function(map){
                that.token=map.token;       
            });
             setTimeout(() => {
                that.getRegionList();
            }, 50);
        },
        methods:{
            close(){
                nativeMoudle.close();
            },
            getRegionList(){
               var that=this;
              
               stream.fetch({
                method: 'GET',
                url: that.webHost+'/api/region/list/-1',
                type:'json',
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                }
                }, function(ret) {
                   if(ret.ok){    
                       nativeMoudle.progressDialogDismiss();
                        if(ret.data.status==0){
                            //  nativeMoudle.toast(ret.data);
                            if(ret.data.data.regionInfo==null||ret.data.data.regionInfo==''||ret.data.data.regionInfo==undefined){
                                    that.regionList=[];
                            }else{
                                    that.regionList=ret.data.data.regionInfo;
                            }         
                            if(ret.data.data.regionClub==null||ret.data.data.regionClub==''||ret.data.data.regionClub==undefined){
                                    that.clubList=[];
                            }else{
                                var list=ret.data.data.regionClub;  
                                var arr=[];                          
                                    for(var i=0,len=list.length;i<len;i++){
                                        list[i].selected=false;
                                        if(list[i].regionId==null){
                                            arr.push(list[i])
                                        }
                                    }
                                    that.clubList=arr;
                            } 
                            that.overalAreaId=ret.data.data.superRegionInfo.id;
                        }else{
                            nativeMoudle.toastError(ret.data.message);
                        }
                   }else{
                     nativeMoudle.toastError('网络错误！')
                   }
               
                },function(response){
               }); 
            },
            moveCenterEvent(){
                this.showChooseCenter=true;
            },
            selectCenter(id){
                for(var i=0,len=this.clubList.length;i<len;i++){
                    if(id==this.clubList[i].clubId){
                        if(this.centerIdList.indexOf(id)==-1){
                            this.centerIdList.push(id)
                        }else{
                            var index=this.centerIdList.indexOf(id)
                            this.centerIdList.splice(index,1);
                        }
                        this.clubList[i].selected=!this.clubList[i].selected; 
                    }
                }
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
                            transform: 'translate(-282px, 0px)',
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
            cancelSelect(){
                this.showChooseCenter=false;
                this.centerIdList=[];
            },
            moveRegion(){
                var that=this;
                storage.setItem('centerIdList',JSON.stringify(that.centerIdList),res=>{
                    if(res.result=='success'){
                       that.$router.push('/selectRegion')
                    }
                })
            },
            empty(){},
            clearName(){
              this.regionName='';
              this.$refs.inputText.blur();
            },
            addRegion(){
               this.showAddRegion=true;
               this.title='添加区域'
            },
            hideAddRegion(){
                this.$refs.inputText.blur();
                this.regionName='';
                this.showAddRegion=false; 
            },
            submitAddRegion(){
                this.$refs.inputText.blur();
                var that=this;
                if(that.regionName==''){
                     nativeMoudle.toastError('请输入区域名称');
                     return;
                }              
                if(that.title=='添加区域'){
                    var arr=JSON.stringify({
                        parentId:that.overalAreaId,
                        regionName:that.regionName
                    }) 
                    var URL=that.webHost+'/api/region/add';
                    var method='POST';
                }else{
                    var arr=JSON.stringify({
                        id:that.actionRegionId,
                        regionName:that.regionName
                    })
                    var URL=that.webHost+'/api/region/update';
                     var method='PUT';
                }
                 nativeMoudle.showProgressDialog();
                stream.fetch({
                    method: method,
                    url: URL,
                    type:'json',
                    headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    },
                    body:arr
                    }, function(ret) {
                    if(ret.ok){  
                         nativeMoudle.progressDialogDismiss();                   
                            if(ret.data.status==0){
                                nativeMoudle.toastSuccess('操作成功');
                                 that.hideAddRegion();                                  
                                 if(that.title=='编辑区域'){
                                    that.goRight(that.currentIndex,0)
                                 }
                                setTimeout(() => {
                                    that.getRegionList();                                   
                                }, 200);
                            }else{
                              nativeMoudle.toastError(ret.data.message);
                             that.showAddRegion=false;

                            }
                    }else{
                        nativeMoudle.toastError('网络错误！')
                    }
                
                    },function(response){
                }); 
            },
            setAdministrator(regionId){                       
                  this.$router.push({name:'adminList',query:{id:regionId}});
            },
            editRegion(regionId,name){
                this.showAddRegion=true;
                this.title='编辑区域';
                this.regionName=name;
                this.actionRegionId=regionId;
            },
            hideDeleteRegion(){
                this.showDeleteRegion=false; 
            },
            submitDeleteRegion(){  
                var that=this;      
                nativeMoudle.showProgressDialog();   
                stream.fetch({
                    method: 'DELETE',
                    url: that.webHost+'/api/region/delete/'+that.actionRegionId,
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
                                    that.regionList.splice(that.deleteIndex, 1);
                                    that.getRegionList();                                   
                                }, 500);
                            }else{
                              nativeMoudle.toastError(ret.data.message);
                            }
                    }else{
                        nativeMoudle.toastError('网络错误！')
                    }
                
                    },function(response){
                }); 
            },
            toSub(id,parentId){
                this.$router.push({name:'subpages',query:{id:id,parentId:parentId}});
            }
        }
     }
</script>
<style scoped>
    .deleteRegionBox{
        width: 516px;
            height: 263px;
            background-color: #ffffff;
            border-radius: 6px;
            align-items: center;
    }
   
  .swiperBox{
        width: 725px; 
        height:93px; 
    }
    .swiperItem{
       flex-direction: row; 
       width: 1007px;
    }
    .regionItem{
      width: 725px; 
      height: 93px; 
      background-color: #ffffff;
      flex-direction: row;
      align-items: center;
      border-bottom-width: 1px;
      border-bottom-color: #EAEAEA;
      border-bottom-style: solid;
    }
.regionItems{
      width: 600px; 
      height: 93px; 
      background-color: #ffffff;
      flex-direction: row;
      align-items: center;
    }
    .swiperBtn{
        width: 282px; 
        height: 93px; 
        flex-direction: row;
    }
    .setting{
            width: 94px; 
            height: 93px; 
            align-items: center;
            justify-content: center;
            background-color: #108EE9;
            color: #ffffff;
            font-size: 19px;
    }
    .edit{
            width: 94px; 
            height: 93px; 
            align-items: center;
            justify-content: center;
            background-color: #7570FF;
            color: #ffffff;
            font-size: 19px;
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
        padding-left: 23px;
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
    .addIcon{
      width: 28px;
      height: 28px;  
    }
    .centerTxt{
        font-size: 17px;
        color: #999999;
        margin-left: 23px;
    }
    .manageBtn{
        flex-direction: row;
    }
    .centerManage{
         height: 64px;
         justify-content: space-between;
         width: 750px;
         flex-direction: row;
         align-items: center;
    }
    .submitBtn{
        width: 80px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background-color: #108EE9;
        color: #FFFFFF;
        font-size: 15px;
        border-radius: 4px;
        margin-right: 19px; 
        border-color: #108EE9;
        border-width: 1px;
        border-style: solid;
    }
    .cancelBtn{
        width: 80px;
        height: 34px;
        color: #666666;
        line-height: 34px;
        text-align: center;
        font-size: 15px;
        border-radius: 4px;
        margin-right: 23px; 
        border-color: #666666;
        border-width: 1px;
        border-style: solid;
    }
    .centerItem{
        height: 93px;
        width:725px;
        border-bottom-width: 1px;
        border-bottom-color: #EAEAEA;
        border-bottom-style: solid;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .centerMess{
        align-items: center;
        flex-direction: row;
    }
    .centerIcon{
        width: 34px;
        height: 34px;
        margin-right: 19px;
    }
    .centerName{
        color: #333333;
        font-size: 19px;
    }
    .selectedBtn{
        width: 28px;
        height: 28px;
        margin-right: 23px;
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
        height: 383px;
        background-color: #ffffff;
        border-radius: 6px;
        align-items: center;
    }
    .addReginTxt{
        color: #333333;
        font-size: 30px;
        margin-top:58px;
        margin-bottom: 50px;
        width: 516px;
        text-align: center;
    }
    .nameBox{
        width: 375px;
        border-bottom-color: #f6d6f6;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        padding-bottom: 23px;
        align-items:center;
        flex-direction: row;
        justify-content: space-between; 
        margin-bottom: 58px;
    }
    .nameInput{
        width: 315px;
        height: 40px;
        font-size: 22px;
        text-align: left;
        padding-left: 10px;
        border-color: #ffffff;
    }
    .cancelIcon{
        width:28px;
        height: 28px;
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


