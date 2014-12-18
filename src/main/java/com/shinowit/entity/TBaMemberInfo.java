package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TBa_MemberInfo")
public class TBaMemberInfo {
    private int id;
    private String userName;
    private String pwd;
    private String email;
    private String iname;
    private BigDecimal balance;
    private Boolean status;
    private Timestamp regDate;
    private Timestamp activeDate;
    private String remark;
    private Collection<TBaMembeAddrInfo> tBaMembeAddrInfosByUserName;
    private Collection<TBaSupplyRecordInfo> tBaSupplyRecordInfosByUserName;
    private Collection<TMeOrderInfo> tMeOrderInfosByUserName;

    @Basic
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",updatable = false,insertable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "UserName")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "lName")
    public String getIname() {
        return iname;
    }

    public void setIname(String iname) {
        this.iname = iname;
    }


    @Basic
    @Column(name = "Balance")
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "RegDate")
    public Timestamp getRegDate() {
        return regDate;
    }

    public void setRegDate(Timestamp regDate) {
        this.regDate = regDate;
    }

    @Basic
    @Column(name = "ActiveDate")
    public Timestamp getActiveDate() {
        return activeDate;
    }

    public void setActiveDate(Timestamp activeDate) {
        this.activeDate = activeDate;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName",fetch = FetchType.LAZY)
    public Collection<TBaMembeAddrInfo> getTBaMembeAddrInfosByUserName() {
        return tBaMembeAddrInfosByUserName;
    }

    public void setTBaMembeAddrInfosByUserName(Collection<TBaMembeAddrInfo> tBaMembeAddrInfosByUserName) {
        this.tBaMembeAddrInfosByUserName = tBaMembeAddrInfosByUserName;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName",fetch = FetchType.LAZY)
    public Collection<TBaSupplyRecordInfo> getTBaSupplyRecordInfosByUserName() {
        return tBaSupplyRecordInfosByUserName;
    }

    public void setTBaSupplyRecordInfosByUserName(Collection<TBaSupplyRecordInfo> tBaSupplyRecordInfosByUserName) {
        this.tBaSupplyRecordInfosByUserName = tBaSupplyRecordInfosByUserName;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName",fetch = FetchType.LAZY)
    public Collection<TMeOrderInfo> getTMeOrderInfosByUserName() {
        return tMeOrderInfosByUserName;
    }

    public void setTMeOrderInfosByUserName(Collection<TMeOrderInfo> tMeOrderInfosByUserName) {
        this.tMeOrderInfosByUserName = tMeOrderInfosByUserName;
    }
}
