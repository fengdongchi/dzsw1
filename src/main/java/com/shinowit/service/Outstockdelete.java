package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/28.
 */
@Service
public class Outstockdelete {
    @Resource
    private BaseDAO<TMeOutStockInfo> outdao;
    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> outdetaildao;

    public Boolean delete(String Code){
        boolean result=false;
    try {
        int i = outdetaildao.executeHQL("delete from TMeOutStockDetailsInfo where TMeOutStockInfoByOutBillCode.outBillCode=?", Code);

        if (i > 0) {
            outdao.executeHQL("delete from TMeOutStockInfo where outBillCode=?", Code);
            result = true;
        }
    }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
}