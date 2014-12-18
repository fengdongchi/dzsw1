package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TBa_SupplyRecordInfo")
public class TBaSupplyRecordInfo {
    private int id;
    private String payAccountNo;
    private String payBank;
    private String recAccountNo;
    private String recBank;
    private String remark;
    private BigDecimal totalMoney;
    private Timestamp supplyTime;
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
    @Column(name = "PayAccountNo")
    public String getPayAccountNo() {
        return payAccountNo;
    }

    public void setPayAccountNo(String payAccountNo) {
        this.payAccountNo = payAccountNo;
    }

    @Basic
    @Column(name = "PayBank")
    public String getPayBank() {
        return payBank;
    }

    public void setPayBank(String payBank) {
        this.payBank = payBank;
    }

    @Basic
    @Column(name = "RecAccountNo")
    public String getRecAccountNo() {
        return recAccountNo;
    }

    public void setRecAccountNo(String recAccountNo) {
        this.recAccountNo = recAccountNo;
    }

    @Basic
    @Column(name = "RecBank")
    public String getRecBank() {
        return recBank;
    }

    public void setRecBank(String recBank) {
        this.recBank = recBank;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "SupplyTime")
    public Timestamp getSupplyTime() {
        return supplyTime;
    }

    public void setSupplyTime(Timestamp supplyTime) {
        this.supplyTime = supplyTime;
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
