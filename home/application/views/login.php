<? $this->load->view("front_common/header") ?>

	<div class="content">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img
              src="<? echo base_url() ?>assets/images/undraw_remotely_2j6y.svg"
              alt="Image"
              class="img-fluid"
            />
          </div>
          <div class="col-md-5 contents offset-1 mt-5">
            <div class="row justify-content-center">
              <div class="col-md-12">
                <div class="mb-4">
                  <h3>Institution Login</h3>
                  <div id="rmsg"></div>
                </div>
                <form id="login" method="post">
                  <div class="form-group first">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" name="email" required id="username" />
                  </div>
                  <div class="form-group last mb-4">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" name="password" required id="password" />
                  </div>

                  <div class="d-flex mb-5 align-items-center">
                    <span class="mr-auto">
                       <a href="<? echo base_url("register") ?>" class="forgot-pass"
                        >Create an Account</a>
                    </span>
                    <!--<span class="ml-auto">
                    	<a href="<? //echo base_url("forgot-password") ?>" class="forgot-pass">Forgot Password</a>
                    </span>-->
                  </div>

                  <input
                    type="submit"
                    value="Log In"
                    class="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<? $this->load->view("front_common/footer") ?>
<script>

	$("#login").submit(function(e){
		
		e.preventDefault();
		var fdata = $(this).serialize();
		$.ajax({
			type : "post",
			url : "<? echo base_url("home/do_login") ?>",
			data : fdata,
			dataType: "json",
			success : function(data){
				if(data.status){
					window.location.href = "<? echo base_url('dashboard') ?>";
				}else{
					window.scrollTo({ top: 0, behavior: 'smooth' });
					$("#rmsg").html(data.msg);
				}
			},
			error : function(data){
				window.scrollTo({ top: 0, behavior: 'smooth' });
				$("#rmsg").html(data.msg);
			}
		})
		
	})
	
</script>

