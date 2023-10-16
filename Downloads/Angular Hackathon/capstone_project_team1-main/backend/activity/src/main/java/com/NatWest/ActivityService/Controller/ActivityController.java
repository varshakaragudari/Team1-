package com.NatWest.ActivityService.Controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.NatWest.ActivityService.Exception.ResourceNotFoundException;
import com.NatWest.ActivityService.Model.Activity;
import com.NatWest.ActivityService.Repository.ActivityRepository;

@RestController
@CrossOrigin
@RequestMapping("/activity")
public class ActivityController {
	@Autowired
	ActivityRepository activityrepo;
	
	@PostMapping("/new")
	public ResponseEntity<?> addActivity(@RequestBody Activity p)
	{
		Activity obj=this.activityrepo.save(p);
		return ResponseEntity.ok(obj);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/all")
	public ResponseEntity<?> getAllActivity()
	{
		List<Activity> obj=this.activityrepo.findAll();
		return ResponseEntity.ok(obj);
	}
	
	@GetMapping("/{Id}")
	public ResponseEntity<?> getActivityById(@PathVariable String Id)
	{
		Optional<Activity> obj=this.activityrepo.findById(Id);
		if (obj.isPresent()) {
			return ResponseEntity.ok(obj.get());
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + Id);
		}
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getActivityByUserId(@PathVariable String userId)
	{
		List<Activity> obj=this.activityrepo.findAll().stream()
				.filter(acti -> userId.equals(acti.getUserId())) // Adjust the condition as needed
				.collect(Collectors.toList());
		System.out.println(obj);
		return ResponseEntity.ok(obj);
	}
	
	@PutMapping("/update/{id}")
    public ResponseEntity <?> updateActivity(@PathVariable String id, @RequestBody Activity actv) {
        actv.setActivityId(id);
        return ResponseEntity.ok().body(this.activityrepo.save(actv));
    }
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity <?> deleteActivity(@PathVariable String id) {
		this.activityrepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
	
}
