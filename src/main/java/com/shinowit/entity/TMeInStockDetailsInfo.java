package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TMe_InStockDetailsInfo")
public class TMeInStockDetailsInfo {
    private int id;
    private int num;
    private BigDecimal price;
    private TMeInStockInfo tMeInStockInfoByBillCode;
    private TMeMerchandiseInfo tMeMerchandiseInfoByMerchandiseId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID",updatable = false,insertable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
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
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeInStockInfo getTMeInStockInfoByBillCode() {
        return tMeInStockInfoByBillCode;
    }

    public void setTMeInStockInfoByBillCode(TMeInStockInfo tMeInStockInfoByBillCode) {
        this.tMeInStockInfoByBillCode = tMeInStockInfoByBillCode;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfo getTMeMerchandiseInfoByMerchandiseId() {
        return tMeMerchandiseInfoByMerchandiseId;
    }

    public void setTMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfo tMeMerchandiseInfoByMerchandiseId) {
        this.tMeMerchandiseInfoByMerchandiseId = tMeMerchandiseInfoByMerchandiseId;
    }
}
