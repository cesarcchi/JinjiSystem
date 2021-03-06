package aimyamaguchi.co.jp.aimspringsql.resume;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;


@Table(name="RRS_SHIKAKU")
@Entity
@Data
public class Qualification {

    @Id
    @Column(name = "RS_NO")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qualificationid;

    @Column(name = "RS_QUALIFICATION")
    private String qualification_name;

    @Column(name = "RS_RESULT")
    private String qualification_result;

    @Column(name = "RS_YYYY")
    private int qualification_year;

    @Column(name = "RS_MM")
    private int qualification_month;

    @Column(name="ACTIVE")
    private boolean active;

    @ManyToOne
    @JoinColumn(name="RS_RESUME")
    @JsonIgnore
    private ResumeModel s_resume;
}
