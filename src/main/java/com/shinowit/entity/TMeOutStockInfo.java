package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TMe_OutStockInfo")
public class TMeOutStockInfo {
    private int id;
    private String outBillCode;
    private Timestamp outTime;
    private String handlers;
    private Byte outType;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeOrderInfo> tMeOrderInfosByOutBillCode;
    private Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByOutBillCode;
    private TAuOperInfo tAuOperInfoByOperId;

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
    @Column(name = "OutBillCode")
    @GenericGenerator(name="system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator="system-uuid")
    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }

    @Basic
    @Column(name = "OutTime")
    public Timestamp getOutTime() {
        return outTime;
    }

    public void setOutTime(Timestamp outTime) {
        this.outTime = outTime;
    }


    @Basic
    @Column(name = "Handlers")

    public String getHandlers() {
        return handlers;
    }

    public void setHandlers(String handlers) {
        this.handlers = handlers;
    }
    @Basic
    @Column(name = "OutType")
    public Byte getOutType() {
        return outType;
    }

    public void setOutType(Byte outType) {
        this.outType = outType;
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
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }



    @OneToMany(mappedBy = "TMeOutStockInfoByOutBillCode",fetch = FetchType.LAZY)
    public Collection<TMeOrderInfo> getTMeOrderInfosByOutBillCode() {
        return tMeOrderInfosByOutBillCode;
    }

    public void setTMeOrderInfosByOutBillCode(Collection<TMeOrderInfo> tMeOrderInfosByOutBillCode) {
        this.tMeOrderInfosByOutBillCode = tMeOrderInfosByOutBillCode;
    }

    @OneToMany(mappedBy = "TMeOutStockInfoByOutBillCode",fetch = FetchType.LAZY)
    public Collection<TMeOutStockDetailsInfo> getTMeOutStockDetailsInfosByOutBillCode() {
        return tMeOutStockDetailsInfosByOutBillCode;
    }

    public void setTMeOutStockDetailsInfosByOutBillCode(Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByOutBillCode) {
        this.tMeOutStockDetailsInfosByOutBillCode = tMeOutStockDetailsInfosByOutBillCode;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfo tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }
}
