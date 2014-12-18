package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TMe_OrderDetailsInfo")
public class TMeOrderDetailsInfo {
    private int id;
    private Integer num;
    private BigDecimal price;
    private TMeMerchandiseInfo tMeMerchandiseInfoByMerchandiseId;
    private TMeOrderInfo tMeOrderInfoByBillCode;
    private TMeUnitInfo tMeUnitInfoByUnitId;

    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfo getTMeMerchandiseInfoByMerchandiseId() {
        return tMeMerchandiseInfoByMerchandiseId;
    }

    public void setTMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfo tMeMerchandiseInfoByMerchandiseId) {
        this.tMeMerchandiseInfoByMerchandiseId = tMeMerchandiseInfoByMerchandiseId;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeOrderInfo getTMeOrderInfoByBillCode() {
        return tMeOrderInfoByBillCode;
    }

    public void setTMeOrderInfoByBillCode(TMeOrderInfo tMeOrderInfoByBillCode) {
        this.tMeOrderInfoByBillCode = tMeOrderInfoByBillCode;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfo getTMeUnitInfoByUnitId() {
        return tMeUnitInfoByUnitId;
    }

    public void setTMeUnitInfoByUnitId(TMeUnitInfo tMeUnitInfoByUnitId) {
        this.tMeUnitInfoByUnitId = tMeUnitInfoByUnitId;
    }
}
