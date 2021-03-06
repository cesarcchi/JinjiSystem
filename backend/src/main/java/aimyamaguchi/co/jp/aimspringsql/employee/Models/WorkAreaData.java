package aimyamaguchi.co.jp.aimspringsql.employee.Models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name="[M_WAREA]", schema="[dbo]")
public class WorkAreaData {

    @Id
    @Column(name="WAREA_ID")
    private Long id;
    @Column(name="WAREA_DESC")
    private String desc;
    @Column(name="ACTIVE")
    private boolean active;
    

    @OneToMany(mappedBy="shainArea")
    @JsonIgnore
    private List<EmployeeMaster> employee;

}