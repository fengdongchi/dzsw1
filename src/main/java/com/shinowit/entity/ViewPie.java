package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/12/5.
 */
@Entity
@Table(name = "View_pie")
public class ViewPie {
    private String merchandiseName;
    private Integer id;
    private Integer num;

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }


    @Id
    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }


}
