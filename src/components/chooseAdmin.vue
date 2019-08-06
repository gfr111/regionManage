<template>
    <div class="warpper">
        <div class="regionBox" :style="{height:height}">
            <div class="headerBox">
                    <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png" class="returnIcon" @click="returnMain"/>
                    <div class="searchBox">
                        <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/searchIcon.png" class="searchImg"/>
                        <input placeholder="搜索姓名/手机号" class="searchInput" ref="inputText" placeholder-color="#8E9199" v-model="searchTxt"/>
                    </div>
                    <text style='color:#ffffff;font-size:19px;' @click="serarchEvent">{{btnTxt}}</text>
            </div>  
             <!--:style="{height:height-130}"  -->
             <list >
                <cell>
                   <div v-if="list.length!=0||chooseList.length!=0">
                        <div class="centerBox" v-if="list.length!=0">    
                            <div class="centerManage">
                                <text class="centerTxt">上级区域负责人</text>
                                <div class="manageBtn"></div>
                            </div>                             
                            <div class="centerItem" style=" width:750px;background-color:#ffffff;"  v-for="(item,index) in list" :key="index">
                                <img :src="item.trainerPhoto==null?'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultAvata.png':item.trainerPhoto"  class="personIcon"/>
                                <div class="centerMess">
                                    <text class="centerName">{{item.trainerName}}</text>
                                    <text class="centerPhone">{{item.trainerPhone}}</text>
                                </div> 
                            </div>                       
                        </div> 
                        <div class="centerBox" v-if="chooseList.length!=0">    
                            <div class="centerManage">
                                <text class="centerTxt">可选人员</text>
                                <div class="manageBtn"></div>
                            </div>               
                            <div class="peopleLeft" v-for="(item,index) in chooseList" :key="index">
                                <div class="centerItem">                     
                                    <img :src="item.trainerPhoto==null?'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultAvata.png':item.trainerPhoto"  class="personIcon"/>
                                    <div class="centerMess">
                                        <text class="centerName">{{item.trainerName}}</text>
                                        <text class="centerPhone">{{item.trainerPhone}}</text>
                                    </div>
                                </div>
                                <img :src="item.selected?'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/selected.png':'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptySelected.png'"  class="selectedBtn" @click="selectCenter(item.trainerId)"/>
                            </div>                 
                        </div>    
                    </div> 
                     <div  class="emptyBox" :style="{height:height,visibility: componentVisibility}" v-if="list.length==0&&chooseList.length==0" v-cloak>
                        <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png" class="emptyIcon"/>
                        <text class="emptyTxt">这片区域无人管辖</text>
                    </div>                          
                </cell>
            </list>           
            <div class="bottomBox" v-if="adminList.length!=0">
                <text class="addAdmin" @click="addAdminEvent">确认添加({{adminList.length}})</text>
            </div>  
            <div class="bottomBox" v-else>
                <text class="addAdmin">确认添加</text>
            </div>       
        </div>     
    </div>
</template>
<script>
    var modal=weex.requireModule("modal");
    var stream = weex.requireModule('stream'); 
    var nativeMoudle= weex.requireModule('nativeModule');
    export default {
        data(){
            return{
                list:[],
                height:'',
                regionId:'',
                adminList:[],
                token:'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
                webHost:'http://10.0.0.216:9090',
                chooseList:[],
                searchTxt:'',
                btnTxt:'搜索',
                popHeight:'',
                componentVisibility: 'hidden'
            }
        },
        created(){
             var that=this;
              nativeMoudle.showProgressDialog();
               that.popHeight = weex.config.env.deviceHeight;
               that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight+30;
              that.regionId=that.$route.query.areaId;         
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
                this.$refs.inputText.blur();
            },
            selectCenter(id){
                for(var i=0,len=this.chooseList.length;i<len;i++){
                    if(id==this.chooseList[i].trainerId){
                        if(this.adminList.indexOf(id)==-1){
                            this.adminList.push(id)
                        }else{
                            var index=this.adminList.indexOf(id)
                            this.adminList.splice(index,1);
                        }
                        this.chooseList[i].selected=!this.chooseList[i].selected; 
                    }
                }
            },
            getCoachList(){
                var that=this;
                 nativeMoudle.showProgressDialog();
                stream.fetch({
                method: 'GET',
                url: that.webHost+'/api/region/trainer/2/list/'+that.regionId,
                type:'json',
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                }
                }, function(ret) {             
                    if(ret.ok){    
                         nativeMoudle.progressDialogDismiss();
                        if(ret.data.status==0){
                            var list=ret.data.data;                                 
                            for(var i=0,len=list.length;i<len;i++){
                                list[i].selected=false;
                                if(list[i].authType!=5){
                                    that.list.push(list[i])
                                }else{
                                    that.chooseList.push(list[i])
                                }
                            }  
                             if(that.list.length==0&&that.chooseList.length){
                                    that.componentVisibility = 'visible';
                                }else{
                                    that.componentVisibility = 'hidden';
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
            addAdminEvent(){
               var that=this;
                nativeMoudle.showProgressDialog();
                var centerStr=that.adminList.join(',');
               stream.fetch({
                method: 'POST',
                url: that.webHost+'/api/region/trainer/add/'+that.regionId+'?trainerIds='+centerStr,
                type:'json',
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                },
                body:JSON.stringify([])
                }, function(ret) {
                   if(ret.ok){ 
                       nativeMoudle.progressDialogDismiss();
                       that.showMoveRegion=false;    
                       if(ret.data.status==0){        
                         nativeMoudle.toastSuccess('添加成功')             
                           setTimeout(function(){
                               that.$router.go(-1);
                           },500)
                       }else{
                          nativeMoudle.toastError(ret.data.message);
                       }
                   }else{
                     nativeMoudle.toastError('网络错误！')
                   }
               
                },function(response){
                });  
            },
            serarchEvent(){
                this.$refs.inputText.blur();
                var that=this;
                 nativeMoudle.showProgressDialog();
                  if(that.btnTxt=='搜索'){
                     that.btnTxt='取消';
                      stream.fetch({
                        method: 'GET',
                        url: that.webHost+'/api/region/trainer/2/list/'+that.regionId+'?search='+that.searchTxt,
                        type:'json',
                        headers:{
                            "Content-Type": 'application/json',
                            'X-AUTH-TOKEN':that.token
                        }
                        }, function(ret) {             
                            if(ret.ok){    
                                nativeMoudle.progressDialogDismiss();
                                if(ret.data.status==0){
                                    var list=ret.data.data;     
                                    that.list=[];
                                    that.chooseList=[];                          
                                    for(var i=0,len=list.length;i<len;i++){
                                        list[i].selected=false;
                                        if(list[i].authType!=5){
                                            that.list.push(list[i])
                                        }else{
                                            that.chooseList.push(list[i])
                                        }
                                    }  
                                    if(that.list.length==0&&that.chooseList.length==0){
                                        that.componentVisibility = 'visible';
                                    }else{
                                        that.componentVisibility = 'hidden';
                                    }
                                }else{
                                    nativeMoudle.toastError(ret.data.message);
                                }
                            }else{
                            nativeMoudle.toastError('网络错误！')
                            }
                        
                        },function(response){
                        }); 
                 }else{
                    that.btnTxt='搜索';
                    that.searchTxt='';
                    that.adminList=[];
                    that.getCoachList();
                 }
               
           }
        }
     }
</script>
<style scoped>
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
    .regionBox{
        background-color: #F6F6F6;
    }
 
    .headerBox{
        width: 750px;
        height: 70px;
        align-items: center;
        background-color: #4C5160;
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
       margin-right: 23px;
    }
    .searchBox{
      width: 600px;
      height: 45px;
      background-color: #444856;
      border-radius: 4px;
      margin-right: 19px;
      flex-direction: row;
      align-items: center;
    }
    .searchImg{
       width: 19px;
       height: 19px;
       margin-left: 19px;
    }
    .searchInput{
        flex: 1;
        border-width: 0px;
        font-size: 19px;
        height: 45px;
        color: #ffffff;
        padding-left: 23px;
    }
    .centerScroll{
        width: 750px;
        background-color: #ffffff;
    }
     .centerItem{
        height: 93px;
        border-bottom-width: 1px;
        border-bottom-color: #F6F6F6;
        border-bottom-style: solid;
        flex-direction: row;
        align-items: center;
    }
     .centerItems{
        height: 93px;
        flex-direction: row;
        align-items: center;
    }
    .peopleLeft{
          height: 93px;
          width:750px;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          background-color: #ffffff;
           border-bottom-width: 1px;
        border-bottom-color: #F6F6F6;
        border-bottom-style: solid;
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
    .centerManage{
         height: 64px;
         justify-content: space-between;
         width: 750px;
         flex-direction: row;
         align-items: center;
    }
    .centerTxt{
        font-size: 17px;
        color: #999999;
        margin-left: 23px;
    }
    .manageBtn{
        flex-direction: row;
    }
    .selectedBtn{
        width: 28px;
        height: 28px;
        margin-right: 23px;
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
</style>


