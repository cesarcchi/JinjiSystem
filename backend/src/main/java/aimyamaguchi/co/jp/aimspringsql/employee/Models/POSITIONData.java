package aimyamaguchi.co.jp.aimspringsql.employee.Models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name="[M_YAKU]", schema="[DBO]")
public class POSITIONData {

    @Id
    @Column(name="POSITION_ID")
    private Long id;
    @Column(name="POSITION_DESC")
    private String desc;
    @Column(name="ACTIVE")
    private boolean active;

    @OneToMany(mappedBy="position")
    @JsonIgnore
    private List<EmployeeMaster> employee;
}