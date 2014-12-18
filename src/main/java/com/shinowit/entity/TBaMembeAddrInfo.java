package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TBa_MembeAddrInfo")
public class TBaMembeAddrInfo {
    private int id;
    private String recMan;
    private String tel;
    private String recAddress;
    private String postCode;
    private Boolean isDefault;
    private TBaMemberInfo tBaMemberInfoByUserName;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "RecMan")
    public String getRecMan() {
        return recMan;
    }

    public void setRecMan(String recMan) {
        this.recMan = recMan;
    }

    @Basic
    @Column(name = "Tel")
    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Basic
    @Column(name = "RecAddress")
    public String getRecAddress() {
        return recAddress;
    }

    public void setRecAddress(String recAddress) {
        this.recAddress = recAddress;
    }

    @Basic
    @Column(name = "PostCode")
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Basic
    @Column(name = "IsDefault")
    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserName", referencedColumnName = "UserName")
    public TBaMemberInfo getTBaMemberInfoByUserName() {
        return tBaMemberInfoByUserName;
    }

    public void setTBaMemberInfoByUserName(TBaMemberInfo tBaMemberInfoByUserName) {
        this.tBaMemberInfoByUserName = tBaMemberInfoByUserName;
    }
}
