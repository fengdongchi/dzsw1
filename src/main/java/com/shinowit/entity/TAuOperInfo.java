package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TAu_OperInfo")
public class TAuOperInfo {
    private short id;
    private String operId;
    private String operName;
    private String pwd;
    private String address;
    private String linkTel;
    private String qq;
    private String email;
    private String mobile;
    private Short sortId;
    private Boolean state;
    private TAuRoleInfo tAuRoleInfoByRoleId;
    private Collection<TBaLogInfo> tBaLogInfosByOperId;
    private Collection<TMeInStockInfo> tMeInStockInfosByOperId;
    private Collection<TMeOrderInfo> tMeOrderInfosByOperId;
    private Collection<TMeOutStockInfo> tMeOutStockInfosByOperId;

    @Basic
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",updatable = false,insertable = false)
    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    @Id
    @Column(name = "OperID")
    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }

    @Basic
    @Column(name = "OperName")
    public String getOperName() {
        return operName;
    }

    public void setOperName(String operName) {
        this.operName = operName;
    }

    @Basic
    @Column(name = "Pwd")
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Basic
    @Column(name = "Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "QQ")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }


    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfo getTAuRoleInfoByRoleId() {
        return tAuRoleInfoByRoleId;
    }

    public void setTAuRoleInfoByRoleId(TAuRoleInfo tAuRoleInfoByRoleId) {
        this.tAuRoleInfoByRoleId = tAuRoleInfoByRoleId;
    }

    @OneToMany(mappedBy = "TAuOperInfoByOperId",fetch = FetchType.LAZY)
    public Collection<TBaLogInfo> getTBaLogInfosByOperId() {
        return tBaLogInfosByOperId;
    }

    public void setTBaLogInfosByOperId(Collection<TBaLogInfo> tBaLogInfosByOperId) {
        this.tBaLogInfosByOperId = tBaLogInfosByOperId;
    }

    @OneToMany(mappedBy = "TAuOperInfoByOperId",fetch = FetchType.LAZY)
    public Collection<TMeInStockInfo> getTMeInStockInfosByOperId() {
        return tMeInStockInfosByOperId;
    }

    public void setTMeInStockInfosByOperId(Collection<TMeInStockInfo> tMeInStockInfosByOperId) {
        this.tMeInStockInfosByOperId = tMeInStockInfosByOperId;
    }

    @OneToMany(mappedBy = "TAuOperInfoByOperId",fetch = FetchType.LAZY)
    public Collection<TMeOrderInfo> getTMeOrderInfosByOperId() {
        return tMeOrderInfosByOperId;
    }

    public void setTMeOrderInfosByOperId(Collection<TMeOrderInfo> tMeOrderInfosByOperId) {
        this.tMeOrderInfosByOperId = tMeOrderInfosByOperId;
    }

    @OneToMany(mappedBy = "TAuOperInfoByOperId",fetch = FetchType.LAZY)
    public Collection<TMeOutStockInfo> getTMeOutStockInfosByOperId() {
        return tMeOutStockInfosByOperId;
    }

    public void setTMeOutStockInfosByOperId(Collection<TMeOutStockInfo> tMeOutStockInfosByOperId) {
        this.tMeOutStockInfosByOperId = tMeOutStockInfosByOperId;
    }
}
