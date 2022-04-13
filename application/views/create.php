<? 
	$this->load->view("front_common/header"); 
	$bid = $this->input->get("bid");
?>

<style>

	.col-form-label {
		text-align: right;
	}

</style>

<div class="content1">
	<div class="container">
		<h4>Curriculum Design</h4>
		<h6 class="courseweightageLabel"></h6>
		<div class="col-lg-12 card-col">
			<form method="post" id="createBranch">
				<div class="row mt-4" id="create_fields">
					<div class="col-lg-6 rspnsv-mb">
						<select class="custom-select" name="program" id="program" required>
							<option value="">Program</option>
							<? foreach($programs as $p){
								$sel = ($branch_data->program == $p->id) ? 'selected' : '';
								echo '<option value="'.$p->id.'" '.$sel.'>'.$p->program_name.'</option>';
							} ?>
						</select>
					</div>
					<div class="col-lg-6">
						<select class="custom-select" name="course" id="courses" required>
							<option value="">Course</option>
						</select>
					</div>
					<div class="col-lg-12">
						<br/>
						<div class="form-group">
							<label for="usr">Course / Branch name:</label>
							<input type="text" class="form-control" name="branch_name" value="<? echo $branch_data->branch_name ?>" id="branch_name"/>
						</div>
					</div>
					<div class="col-lg-12">
						<div class="form-group" id="sub_categories" style="display: none;">
							<label for="usr">Subject Categories </label>
<!--							<input type="hidden" name="sub_categories" id="sub_categories">-->
<!--							<div id="sub_cats" class="transfer-demo"></div>-->
							<select multiple="multiple" name="sub_categories[]" id="sub_cats" title="duallistbox_demo1[]">
							</select>
					
						</div>
						<input type="button" class="btn btn-primary" id="gotoWeightage" value="Submit">
					</div>
					
				</div>

				<div class="row" id="selectWeightage" style="display: none">
					<div class="col-lg-12 ml-auto d-flex">
						<i class="fa fa-arrow-left fa-2x backFields pull-left" style="cursor: pointer"></i>
						<p class="mb-0 text-dark p-1 ml-auto"><b style="font-weight: 700;">Total Percentage:</b> <b>100 %</b>&nbsp;&nbsp;<b style="font-weight: 700;">Total Credits:</b> <b class="courseCredits"> <? echo ($branch_data->min_credits != "") ? "($branch_data->min_credits - $branch_data->max_credits)" : '' ?> </b></p>
					</div>
					<h4 style="text-align: center;margin-bottom: 40px;margin-top: 10px;">Enter Weightages</h4>
					<div class="col-lg-12" align="right">
						
					</div>
					<div class="col-lg-12 subcategories_weightages">
						
					</div>
					<div class="col-lg-12" align="center">
						<input type="hidden" name="bid" value="<? echo $bid ?>">
						<input type="submit" value="Submit" class="btn btn-primary">
					</div>
				</div>
			</form>	
		</div>
	</div>
</div>
<input type="hidden" class="weightagelabel">

<? $this->load->view( "front_common/footer" ) ?>


<script type="text/javascript">
	
	<? if($this->input->get("bid")){ ?>
		
		$(document).ready(function(){
			
			<? if($branch_data->course){ ?>
	
				var id = <? echo ($branch_data->course != "") ? $branch_data->course : 0 ?>;

			<? } ?>
			getCourses();
			getSubcategories(id);
			gotoWeightage();
			$("#create_fields").show();
			$("#selectWeightage").hide();
			
		})
	
	<? } ?>
	
	$("#createBranch").submit(function(e){
		
		e.preventDefault();
		var fdata = $(this).serialize();
		$.ajax({
			type : "post",
			url : "<? echo base_url('dashboard/insertBranch') ?>",
			data : fdata,
			dataType: "json",
			success : function(data){
				if(data.status){
					swal(
					  '',
					  data.msg,
					  'success'
					);
					setTimeout(function(){
						window.location.href = "<? echo base_url('create-design/add-subjects') ?><? echo ($bid != "") ? "?bid=$bid" : '' ?>";
					},3000)
				}else{
					swal(
					  '',
					  data.msg,
					  'error'
					);
					return false;
				}
			},
			error : function(data){
				console.log(data);
				swal(
				  data.msg,
				  '',
				  'error'
				);
				return false;
			}
		})
		
	});

	$(".backFields").click(function(){
		
		$("#create_fields").show();
		$("#selectWeightage").hide();
		
	})
	
	function getCourses(){
		
		var id = $("#program").val();
		$.ajax({
			type: "post",
			data: {id:id,cid:<? echo ($branch_data->course != "") ? $branch_data->course : 0 ?>},
			url: "<? echo base_url('ajax/getCourses') ?>",
			success: function(data){
				$("#courses").html(data);
			}
		})
		
	}
			   
	function getSubcategories(id=""){
	
		$('#sub_cats').html("");
		$("#sub_categories").show();	
			
		$.ajax({
			type: "post",
			data: {id:id,sub_ids:<? echo ($branch_data->subject_categories != "") ? $branch_data->subject_categories : "[]"; ?>},
			dataType: "json",
			url: "<? echo base_url('ajax/getsubCategories') ?>",
			success: function(data){
				
//				console.log(data);
				$('#sub_cats').html(data.subcategories);
				$('.courseCredits').html(data.credits);
				$('#sub_cats').bootstrapDualListbox();
				
			},
			error: function(data){
				console.log(data)
			}
		})	
			
	}		   
	
	$("#program").change(function(){
		
		getCourses();
		
	})
	
	$("#courses").change(function(){
		
		var id = $("#courses").val();
		var coname = $('option:selected', this).attr('coname');
		$(".weightagelabel").val(coname);
		
		getSubcategories(id);
		
	})
	
	$("#gotoWeightage").click(function(){
		
		gotoWeightage();
		
	});
	
	function gotoWeightage(){
		
		var program = $("#program").val();
		var courses = $("#courses").val();
		var branch_name = $("#branch_name").val();
		
		if(program == ""){
			swal(
			  'Program Name Is Required',
			  '',
			  'error'
			);
			return false;
		}
		
		<? if($branch_data->course == ""){ ?>
		
			if(courses == ""){
				swal(
				  'Course Name Is Required',
				  '',
				  'error'
				);
				return false;
			}
		
		<? } ?>
		
		if(branch_name == ""){
			swal(
			  'Branch Name Is Required',
			  '',
			  'error'
			);
			return false;
		}
		
		var sub_categories = [];
		
		$("select[name='sub_categories[]']").map(function(){
			sub_categories.push($(this).val());
		})
		
		if(sub_categories.length == 0){
			swal(
			  'Subject Categories Are Required',
			  '',
			  'error'
			);
			return false;
		}
		
		var scats = "";
		
		var options = [],
			option;
		
		var sub_cats = [];
		  var tax = document.getElementById('sub_cats');
		  var len = tax.options.length;

		  for (var i = 0; i < len; i++) {
			option = tax.options[i];
			if (option.selected) {
				 options.push(option);

				var cname = option.getAttribute('cname');
				var id = option.getAttribute('value');
				
				sub_cats.push({cname:cname,id:id});

			}

		  }
		var courses = $("#courses").val();
		$.ajax({
			type : "post",
			data : {sub_cats:sub_cats,weightages:<? echo ($branch_data->weightage != "") ? $branch_data->weightage : "[]" ?>,cid:courses},
			url : "<? echo base_url('ajax/getWeightages') ?>",
			success : function(data){
				
				var course = $('#courses option:selected').attr('coname');
				var branch_name = $("#branch_name").val();
				
				$(".courseweightageLabel").html("("+course+' - '+branch_name+")");
				$(".subcategories_weightages").html(data);
			},
			error : function(data){
				console.log(data);
			}
		})
		
		$(".subcategories_weightages").html(scats);
		
		$("#create_fields").hide();
		$("#selectWeightage").show();
		
	}
	
	$(document).on("change",".getWeightages",function(){
		
		var sid = $(this).attr("subid");
		var weightage = $(this).val();
		var courses = $("#courses").val();
		
		$.ajax({
			type: "post",
			data: {weightage:weightage,cid:courses},
			url: "<? echo base_url('ajax/getCreditweightage') ?>",
			success: function(data){
				$(".assignCredits-"+sid).html(data);
			}
		})
		
		var weightage = $("input[name='weightage[]']")
              .map(function(){return $(this).val();}).get();

		var totalWeightage = 0;
		$.each(weightage,function(){totalWeightage+=parseFloat(this) || 0;});
		$(".selWeightage").html('<b>'+(Math.round(totalWeightage*10)/10).toFixed(1)+" %</b>");
		
	})
	
</script>