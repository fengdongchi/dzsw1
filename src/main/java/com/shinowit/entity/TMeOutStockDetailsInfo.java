package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TMe_OutStockDetailsInfo")
public class TMeOutStockDetailsInfo {
    private int id;
    private Integer num;
    private BigDecimal price;
    private BigDecimal stockPrice;
    private TMeMerchandiseInfo tMeMerchandiseInfoByMerchandiseId;
    private TMeOutStockInfo tMeOutStockInfoByOutBillCode;

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

    @Basic
    @Column(name = "stock_price")
    public BigDecimal getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(BigDecimal stockPrice) {
        this.stockPrice = stockPrice;
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
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")
    public TMeOutStockInfo getTMeOutStockInfoByOutBillCode() {
        return tMeOutStockInfoByOutBillCode;
    }

    public void setTMeOutStockInfoByOutBillCode(TMeOutStockInfo tMeOutStockInfoByOutBillCode) {
        this.tMeOutStockInfoByOutBillCode = tMeOutStockInfoByOutBillCode;
    }
}
