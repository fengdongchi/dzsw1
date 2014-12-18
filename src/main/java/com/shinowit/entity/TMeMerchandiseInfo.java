package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-12.
 */
@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfo {
    private Integer id;
    private String merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private BigDecimal price;
    private boolean saleStatus;
    private String spec;
    private String describe;
    private String picPath;
    private Integer clickCount;
    private String remark;
//    private Collection<TMeInStockDetailsInfo> tMeInStockDetailsInfosByMerchandiseId;
    private TMeMerchandiseCInfo tMeMerchandiseCInfoByMerchandiseCid;
    private TMeProStatusInfo tMeProStatusInfoByProStatusId;
    private TMeUnitInfo tMeUnitInfoByUnitId;
//    private Collection<TMeOrderDetailsInfo> tMeOrderDetailsInfosByMerchandiseId;
//    private Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByMerchandiseId;
    private Collection<TMeStockInfo> tMeStockInfosByMerchandiseId;


    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseID")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
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
    @Column(name = "SaleStatus")
    public boolean isSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


//
//    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId",fetch = FetchType.LAZY)
//    public Collection<TMeInStockDetailsInfo> getTMeInStockDetailsInfosByMerchandiseId() {
//        return tMeInStockDetailsInfosByMerchandiseId;
//    }
//
//    public void setTMeInStockDetailsInfosByMerchandiseId(Collection<TMeInStockDetailsInfo> tMeInStockDetailsInfosByMerchandiseId) {
//        this.tMeInStockDetailsInfosByMerchandiseId = tMeInStockDetailsInfosByMerchandiseId;
//    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public TMeMerchandiseCInfo getTMeMerchandiseCInfoByMerchandiseCid() {
        return tMeMerchandiseCInfoByMerchandiseCid;
    }

    public void setTMeMerchandiseCInfoByMerchandiseCid(TMeMerchandiseCInfo tMeMerchandiseCInfoByMerchandiseCid) {
        this.tMeMerchandiseCInfoByMerchandiseCid = tMeMerchandiseCInfoByMerchandiseCid;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public TMeProStatusInfo getTMeProStatusInfoByProStatusId() {
        return tMeProStatusInfoByProStatusId;
    }

    public void setTMeProStatusInfoByProStatusId(TMeProStatusInfo tMeProStatusInfoByProStatusId) {
        this.tMeProStatusInfoByProStatusId = tMeProStatusInfoByProStatusId;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfo getTMeUnitInfoByUnitId() {
        return tMeUnitInfoByUnitId;
    }

    public void setTMeUnitInfoByUnitId(TMeUnitInfo tMeUnitInfoByUnitId) {
        this.tMeUnitInfoByUnitId = tMeUnitInfoByUnitId;
    }

//    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId",fetch = FetchType.LAZY)
//    public Collection<TMeOrderDetailsInfo> getTMeOrderDetailsInfosByMerchandiseId() {
//        return tMeOrderDetailsInfosByMerchandiseId;
//    }
//
//    public void setTMeOrderDetailsInfosByMerchandiseId(Collection<TMeOrderDetailsInfo> tMeOrderDetailsInfosByMerchandiseId) {
//        this.tMeOrderDetailsInfosByMerchandiseId = tMeOrderDetailsInfosByMerchandiseId;
//    }
//
//    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId",fetch = FetchType.LAZY)
//    public Collection<TMeOutStockDetailsInfo> getTMeOutStockDetailsInfosByMerchandiseId() {
//        return tMeOutStockDetailsInfosByMerchandiseId;
//    }
//
//    public void setTMeOutStockDetailsInfosByMerchandiseId(Collection<TMeOutStockDetailsInfo> tMeOutStockDetailsInfosByMerchandiseId) {
//        this.tMeOutStockDetailsInfosByMerchandiseId = tMeOutStockDetailsInfosByMerchandiseId;
//    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId",fetch = FetchType.LAZY)

    public Collection<TMeStockInfo> getTMeStockInfosByMerchandiseId() {
        return tMeStockInfosByMerchandiseId;
    }

    public void setTMeStockInfosByMerchandiseId(Collection<TMeStockInfo> tMeStockInfosByMerchandiseId) {
        this.tMeStockInfosByMerchandiseId = tMeStockInfosByMerchandiseId;
    }
}
