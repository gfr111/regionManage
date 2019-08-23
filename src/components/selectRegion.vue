<template>
    <div class="warpper">
        <div class="regionBox" :style="{height:height}">
            <div class="headerBox">
                <div class="leftBox">
                    <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png" class="returnIcon" @click="returnMain"/>
                    <text style="color:#ffffff;" @click="returnMain">选择区域</text>
                </div>
                <text class="rightBox" @click="returnMain">取消</text>
            </div>
            <div class="navBox" v-if="isAllHeader!=-1">    
               <div class="beforeStepBox" >
                  <text style="color:#108EE9;font-size:19px;" @click="getRegionList(beforeHeaderRegionId)" >返回上一级</text>
                  <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/beforeStep.png" class="beforeIcon"/>
                </div>      
               <div class="areaList">
                     <text class="blueTtxt" @click="getRegionList(-1)">全部</text>
                     <div  v-for="(item,index) in headerRegionList" :key="index" v-if="headerRegionList.length!=0" class="rightRegionBox">
                        <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/nextIcon.png" class="beforeImg" />
                        <text class="blueTtxt" @click="getRegionList(item.headerRegionId)" v-if="item.headerRegionId!=lastHeaderRegionId">{{item.headerRegionName}}</text>
                        <text class="greyTxt" v-if="item.headerRegionId==lastHeaderRegionId">{{item.headerRegionName}}</text>
                    </div>
               </div>
            </div>
            <!-- :style="{height:height-168}"  -->
            <list class="scroller">
                <cell>
                        <div class="centerBox">
                              <div  v-if="list.length!=0" >
                                    <div class="centerManage">
                                        <text class="centerTxt">区域</text>
                                        <div class="manageBtn"></div>
                                    </div>
                                    <div class="centerItem"  v-for="(item,index) in list" :key="index" @click="getRegionList(item.id)">
                                        <div class="centerMess">
                                            <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/regionIcon.png"  class="centerIcon"/>
                                            <text class="centerName">{{item.name}}</text>
                                        </div>
                                    </div>      
                            </div>
                            <div v-if="list.length==0" class="emptyBox" :style="{height:height-158,visibility: componentVisibility}">
                                <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png" class="emptyIcon"/>
                                <text class="emptyTxt">该区域暂无内容</text>
                            </div> 
                        </div>                      
                </cell>
            </list>
            <div class="bottomBox">
                <text class="newRegion" @click="addRegion">新建区域</text>
                <text class="moveRegion" @click="moveSubmit">移动</text>
            </div>
        </div>
        <div class="bg" v-if="showAddRegion" :style="{height:height}"  @click="hideAddRegion">
            <div class="addregionBox" @click="empty">
                <text class="addReginTxt">添加区域</text>
                <div class="nameBox">
                    <input placeholder="请输入区域名称，不超过八个字"  ref="inputText" placeholder-color='#CCCCCC' class="nameInput" v-model="regionName"/>
                    <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png" class="cancelIcon" v-if="regionName!=''" @click="clearName"/>
                </div>
                <div class="regionBtnBox">
                    <text class="cencelAdd" @click="hideAddRegion">取消</text>
                    <text class="submitAdd" @click="submitAddRegion">确认</text>
                </div>
            </div>
        </div>

        <div class="bg" v-if="showMoveRegion" :style="{height:height}"  @click="hideDeleteRegion">
            <div class="deleteRegionBox" @click="empty">
                <text class="addReginTxt">确认要移动门店到该区域吗？</text>       
                <div class="regionBtnBox">
                    <text class="cencelAdd" @click="showMoveRegion=false;">取消</text>
                    <text class="submitAdd" @click="submitMove">确认</text>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var modal=weex.requireModule("modal");
    const storage = weex.requireModule('storage');
    var stream = weex.requireModule('stream'); 
    var nativeMoudle= weex.requireModule('nativeModule');
    export default {
        data(){
            return{
                list:[],
                height:'',
                centerIdList:[],
                showAddRegion:'',
                regionName:'',
                showMoveRegion:false,
                token:'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
                 webHost:'https://www.woshipt.com',
                regionId:-1,
                headerRegionList:[],
                lastHeaderRegionId:-1,
                beforeHeaderRegionId:-1,
                superRegionId:'',
                popHeight:'',
                isAllHeader:-1,
                componentVisibility: 'hidden'
            }
        },
        created(){
            var that=this;
             nativeMoudle.showProgressDialog();
          
             if(weex.config.env.platform=='iOS'){
                  that.height =750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-20;
              }else{
                  that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight+30;
              }
            storage.getItem('centerIdList',res=>{             
                    if(res.result=='success'){
                      that.centerIdList=JSON.parse(res.data);                  
                   }              
            })
             nativeMoudle.getMetaData(function(map){
                that.token=map.token;       
            });
             setTimeout(() => {
               that.getRegionList(that.regionId);
            }, 50);
            weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
               that.returnMain();
            })
        },
        methods:{
        returnMain(){
            this.$router.go(-1);
            storage.removeItem('centerIdList'); 
        },
         getRegionList(id){
               var that=this;             
                nativeMoudle.showProgressDialog();
               stream.fetch({
                method: 'GET',
                url: that.webHost+'/api/region/list/'+id,
                type:'json',
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                }
                }, function(ret) {
                   if(ret.ok){    
                         nativeMoudle.progressDialogDismiss();
                        if(ret.data.status==0){
                             if(id==-1){
                                that.isAllHeader=-1; 
                            }else{
                                that.isAllHeader=0;
                            }
                             if(ret.data.data.regionInfo==null||ret.data.data.regionInfo==''||ret.data.data.regionInfo==undefined){
                                    that.list=[];
                            }else{
                                    that.list=ret.data.data.regionInfo;
                            }  
                               if(that.list.length==0){
                                    that.componentVisibility = 'visible';
                                }else{
                                    that.componentVisibility = 'hidden';
                                }
                            if(ret.data.data.headerRegions==null||ret.data.data.headerRegions==''||ret.data.data.headerRegions==undefined){
                                    that.headerRegionList=[];
                            }else{
                                    that.headerRegionList=ret.data.data.headerRegions;
                                    that.lastHeaderRegionId=ret.data.data.headerRegions[ret.data.data.headerRegions.length-1].headerRegionId;
                                    if(ret.data.data.headerRegions.length>=2){
                                        that.beforeHeaderRegionId=ret.data.data.headerRegions[ret.data.data.headerRegions.length-2].headerRegionId;
                                    }else{
                                        that.beforeHeaderRegionId=-1;
                                    }
                            } 
                            if(ret.data.data.superRegionInfo==null||ret.data.data.superRegionInfo==''||ret.data.data.superRegionInfo==undefined){
                                    that.superRegionId='';
                            }else{
                                    that.superRegionId=ret.data.data.superRegionInfo.id;
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
         moveSubmit(){
            this.showMoveRegion=true;
         },
         submitMove(){
               var that=this;
                  nativeMoudle.showProgressDialog();
               var centerStr=that.centerIdList.join(',');
               var id=that.lastHeaderRegionId==-1?that.superRegionId:that.lastHeaderRegionId;
               stream.fetch({
                method: 'POST',
                url: that.webHost+'/api/region/club/move/'+id+'?clubIds='+centerStr,
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
                          nativeMoudle.toastSuccess('移动成功!')
                        setTimeout(function(){
                               that.$router.go(-1);
                           },500)
                       }else{
                           modal.toastError({message:ret.data.message});
                       }
                   }else{
                     nativeMoudle.toastError('网络错误！')
                   }
               
                },function(response){
            }); 

         },
        empty(){},
        clearName(){
            this.regionName='';
            this.$refs.inputText.blur();
        },
        addRegion(){
            this.showAddRegion=true;
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
                var arr=JSON.stringify({
                    parentId:that.lastHeaderRegionId==-1?that.superRegionId:that.lastHeaderRegionId,
                    regionName:that.regionName
                }) 
                var URL=that.webHost+'/api/region/add';
                var method='POST';
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
                               
                                setTimeout(() => {
                                    that.getRegionList(that.lastHeaderRegionId);                                   
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
        }
     }
</script>
<style scoped>
.greyTxt{
    color:#999999;
    font-size:19px;
}
.blueTtxt{
    color:#108EE9;
    font-size:19px;
}
.beforeStepBox{
    align-items: center;
    flex-direction: row;
    border-right-color: #999999;
    border-right-style: solid;
    padding-right: 12px;
    border-right-width: 1px;
    margin-right: 12px;
}
.beforeIcon{
    width: 23px;
    height: 23px;
}
.beforeImg{
    width: 23px;
    height: 23px;
    margin-left: 8px;
    margin-right: 8px;
}
.areaList{
    width: 750px;
    height: 75px;
    flex-direction: row;
    align-items: center;  
}
.rightRegionBox{
     flex-direction: row;
    align-items: center;
}
.navBox{
    width: 750px;
    height: 75px;
    background-color: #ffffff;
    margin-bottom: 9px;
    align-items: center;
    flex-direction: row;
    padding-left: 23px;
}
.deleteRegionBox{
        width: 516px;
        height: 263px;
        background-color: #ffffff;
        border-radius: 6px;
        align-items: center;
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
    .rightBox{
      color: #FFFFFF;
      font-size: 19px;
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
         background-color: #f6f6f6;
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
        width:750px;
        padding-left: 25px;
        border-bottom-width: 1px;
        border-bottom-color: #F6F6F6;
        border-bottom-style: solid;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #ffffff;
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
    .scroller{
        /* background-color: #108EE9; */
    }
    .bottomBox{
        position: absolute;
        bottom: 0px;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #CCCCCC;
        width: 750px;
        height: 93px;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        flex-direction: row;
    }
    .newRegion{
        border-color: #DCDCDC;
        border-width: 1px;
        border-style: solid;
        border-radius:50px;
        text-align: center;
        line-height: 66px;
        font-size: 23px;
        color: #666666;
        margin-right: 38px;
        width: 290px;
        height: 66px;
       
    }
    .moveRegion{
        border-color: #108EE9;
        border-width: 1px;
        border-style: solid;
        border-radius:50px;
        text-align: center;
        line-height: 66px;
        background-color: #108EE9;
        font-size: 23px;
        color: #ffffff;
        width: 290px;
        height: 66px;
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


