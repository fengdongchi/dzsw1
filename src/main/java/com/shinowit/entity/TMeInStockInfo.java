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
@Table(name = "TMe_InStockInfo")
public class TMeInStockInfo {
    private int id;
    private String billCode;
    private Byte inType;
    private Timestamp inTime;
    private String handlers;
    private Float totalMoney;
    private String remark;
    private Collection<TMeInStockDetailsInfo> tMeInStockDetailsInfosByBillCode;
    private TAuOperInfo tAuOperInfoByOperId;
    private TBaSupplierInfo tBaSupplierInfoBySupplierId;

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
    @Column(name = "BillCode")
    @GenericGenerator(name="system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator="system-uuid")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "InType")
    public Byte getInType() {
        return inType;
    }

    public void setInType(Byte inType) {
        this.inType = inType;
    }

    @Basic
    @Column(name = "InTime")
    public Timestamp getInTime() {
        return inTime;
    }

    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
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
    @Column(name = "TotalMoney")
    public Float getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Float totalMoney) {
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



    @OneToMany(mappedBy = "TMeInStockInfoByBillCode",fetch = FetchType.LAZY)
    public Collection<TMeInStockDetailsInfo> getTMeInStockDetailsInfosByBillCode() {
        return tMeInStockDetailsInfosByBillCode;
    }

    public void setTMeInStockDetailsInfosByBillCode(Collection<TMeInStockDetailsInfo> tMeInStockDetailsInfosByBillCode) {
        this.tMeInStockDetailsInfosByBillCode = tMeInStockDetailsInfosByBillCode;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfo tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SupplierID", referencedColumnName = "SupplierID")
    public TBaSupplierInfo getTBaSupplierInfoBySupplierId() {
        return tBaSupplierInfoBySupplierId;
    }

    public void setTBaSupplierInfoBySupplierId(TBaSupplierInfo tBaSupplierInfoBySupplierId) {
        this.tBaSupplierInfoBySupplierId = tBaSupplierInfoBySupplierId;
    }
}
