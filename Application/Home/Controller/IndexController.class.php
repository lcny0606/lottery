<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
         $db=M('member');
         $threeprize=$db->where('prize=3')->select();
         $twoprize=$db->where('prize=2')->select();
         $oneprize=$db->where('prize=1')->select();
         $teprize=$db->where('prize=4')->select();
         $empty="<div class='loop valign-wrapper'><img src='http://127.0.0.1/lotteryplatform/Public/images/empty.png'  class='valign'><span class='prizename valign yellow-text accent-2  center-align'>即将开奖</span></div>";
         $this->assign('threeprize',$threeprize);
         $this->assign('twoprize',$twoprize);
         $this->assign('oneprize',$oneprize);
         $this->assign('teprize',$teprize);
         $this->assign('empty',$empty);
         $this->show();
    }

    public function member(){
        $db=M('member');
        $star=I('get.star');
        if($star=='1'){
        $member=$db->select();
        $this->ajaxReturn($member);
    }}

    public function rand(){
        $end=I('post.end');
        $prizeid=I('post.id');
        $db=M('member');
        if($end=='1'){
        $allid=$db->field('id')->where('prize=0')->select();
        $count=count($allid);
        $rand=rand(0,$count);
        $randid=$allid[$rand]['id'];
        $randimg=$db->where('id=%d',$randid)->select();
        $lucky['name']=$randimg[0]['name'];
        $lucky['pic']=$randimg[0]['pic'];
        $up['prize']=$prizeid;
        $db->where('id=%d', $randimg[0]['id'])->save($up);
        $this->ajaxReturn($lucky);

        }

    }

}