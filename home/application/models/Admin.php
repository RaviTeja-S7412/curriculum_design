<?php

defined("BASEPATH") OR exit("No direct script access allow");


class Admin extends CI_Model{
	
	public function __construct(){
		
		parent::__construct();

	}
	
	public function getCreditweightage($weightage,$cid){
		
		$cdata = $this->db->get_where("tbl_courses",["id"=>$cid])->row();
		$min_credits = $cdata->min_credits; 
		$max_credits = $cdata->max_credits;

		$max_weightage = round(($min_credits/100)*$weightage);
		$min_weightage = round(($max_credits/100)*$weightage);
		
		$wc = ["max_weightage"=>$max_weightage,"min_weightage"=>$min_weightage];
		$data = ($weightage != "") ? $wc : [];
		
		return $data;
	
	}

	public function insertoption($option_name,$option_value){
		
		$on=$this->db->get_where("tbl_options",array('option_name'=>$option_name));
		$os=$on->num_rows();
		
		if($os=='0'){
			
			$data=array("option_name"=>$option_name,
					   "option_value"=>$option_value);
			
			$oss=$this->db->insert("tbl_options",$data);
			
			if($oss){
				return true;
			}else{
				return false;
			}
			
		}
		
		if($os='1'){
			
			$data=array("option_name"=>$option_name,
					   "option_value"=>$option_value);
			
			$this->db->set($data);
			$this->db->where("option_name",$option_name);
			$oss=$this->db->update("tbl_options");
			
			if($oss){
				return true;
			}else{
				return false;
			}
		}		
		
	}
	
	public function get_option($option_name){
		
		$option=$this->db->get_where("tbl_options",array("option_name"=>$option_name));
		$o=$option->row();
		if($o){
		
		return $o->option_value;	
		}else{
			$oo='0';
		return $oo;
		}
	}
	
}