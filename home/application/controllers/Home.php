<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/userguide3/general/urls.html
	 */
	public function index(){
		$this->load->view('login');
	}
	
	public function register(){
		$this->load->view('register');
	}
	
	public function insertInstitute(){
		
		$data = $this->input->post();
		$password = $this->input->post("password");
		$cpassword = $this->input->post("cpassword");
		$email = $this->input->post("email");
		
		if($password != $cpassword){
			echo json_encode(["status"=>false,"msg"=>"Password & Confirm Password Do Not Matched."]);
			exit();
		}
		
		$eChk = $this->db->get_where("tbl_institutes",["email"=>$email,"status"=>1])->num_rows();
		if($eChk > 0){
			echo json_encode(["status"=>false,"msg"=>"Email ID Already registered with another Institution."]);
			exit();
		}
		
		$data["password"] = $this->secure->app_password_crypt($password,'e');
		unset($data["cpassword"]);
		
		$d = $this->db->insert("tbl_institutes",$data);
		
		if($d){
			
			$encrypt = $this->secure->app_password_crypt($data['email'],'e');
			$activation_link = base_url()."home/activateInstitute?user=$encrypt";
			$date = date("Y-m-d H:i:s");
			
			$html ='<!DOCTYPE html>
					<html>
					<head>
					 	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
					</head>

					<body>';


						$html .= '

						<p>Dear '.$data['contact_person_name'].',<br><br>		
							You have initiated a "Registration" process with Curriculum Design Portal, dated '.$date.'.<br><br>
							Please click on the below mentioned activation link or access the same using your web browser to complete your registration process.<br><br>
							<a href="'.$activation_link.'">Click Here</a> to verify your account.
						</p>

						<p>

							Regards<br>
							Team IAE<br><br>

							<img src="'.base_url().'assets/images/emaillogo.jpg" style="width:18%"><br>
							<strong>Institute for Academic Excellence</strong><br><br>
							#3-6-692, Street No.12, Himayathnagar,<br>
							Hyderabad - 500029, Telangana.<br>
							Mobile No.: 9618739900<br>
							Email : <a href="mailto:info@iae.education">info@iae.education</a><br>
							Website: <a href="www.iae.education">www.iae.education</a>

						</p>

						</body>
					</html>';
			
			$this->secure->send_email($data["email"],"Your Account Activation Details",$html);
			
			echo json_encode(["status"=>true,"msg"=>"Institution Registered Successfully Please Verify Your Email To Active Your Account."]);
			exit();
				
		}else{
			
			echo json_encode(["status"=>false,"msg"=>"Error Occured Please Try Again."]);
			exit();
			
		}
		
	}
	
	public function activateInstitute(){
		
		$user = $this->input->get("user");
		$iChk = $this->db->get_where("tbl_institutes",["email"=>$user])->num_rows();
		
		if($iChk >= 1){
			
			$d = $this->db->where("email",$user)->update("tbl_institutes");
			if($d){
							
			}
			
		}
		
	}
	
	public function sendOtp(){
		
		$mobile = $this->input->post("mobile");
		$mchk = $this->db->get_where("tbl_mobile_otp",array("mobile"=>$mobile))->num_rows();

		if($mchk > 0){
			$mdata = $this->db->get_where("tbl_mobile_otp",array("mobile"=>$mobile))->row();
			$msg = "Welcome to curriculum design, Your OTP for registration is $mdata->otp, do not share this with anyone.";

			$this->secure->sms_otp($mobile,$msg);

		}else{

			$motp = random_string('numeric',4);
			$mo = $this->db->insert("tbl_mobile_otp",array("mobile"=>$mobile,"otp"=>$motp));

			if($mo){

				$msg = "Welcome to curriculum design, Your OTP for registration is $motp, do not share this with anyone.";
				$this->secure->sms_otp($mobile,$msg);

			}

		}
		
		echo json_encode(array("status"=>true,"msg"=>'<div class="alert alert-success">OTP Sent successfully.</div>'));
			
	}
	
	public function confirmOtp(){
		
		$motp = $this->input->post("otp");
		$mobile = $this->input->post("mobile");
		$mchk = $this->db->order_by("id","desc")->get_where("tbl_mobile_otp",array("mobile"=>$mobile,"otp"=>$motp))->num_rows();
		
		if($mchk == 1){
			$this->db->delete("tbl_mobile_otp",array("mobile"=>$mobile,"otp"=>$motp));
			echo json_encode(array("status"=>true,"msg"=>'<div class="alert alert-success">OTP Verified successfully.</div>'));
		}else{
			echo json_encode(array("status"=>false,"msg"=>'<div class="alert alert-danger">Mobile OTP is wrong</div>'));
			exit();
		}
		
	}
	
	public function activation(){
		
		$this->load->view('activation');
		
	}

	
}
